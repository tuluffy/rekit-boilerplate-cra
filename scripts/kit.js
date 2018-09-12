#! /usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const fsX = require('fs-extra');
const path = require('path');
const _ = require('lodash');

_.pascalCase = _.flow(_.camelCase, _.upperFirst);
_.upperSnakeCase = _.flow(_.snakeCase, _.toUpper);

const srcDir = path.join(__dirname, '..', 'src');
const testsDir = path.join(__dirname, '..', 'tests');
const templatesDir = path.join(__dirname, 'templates');

const add = (feature, name, type = 'component', options = {}) => {
  // format
  feature = _.kebabCase(feature); // a-a-b like
  name = _.camelCase(name); // aAB like

  const featureSrcDir = path.join(srcDir, 'features', feature);
  const featureSrcReduxDir = path.join(srcDir, 'features', feature, 'redux');
  const featureTestsDir = path.join(testsDir, 'features', feature);
  const featureTestsReduxDir = path.join(testsDir, 'features', feature, 'redux');

  // options
  const { async, connect, force, pure } = options;
  let templateType = _.upperFirst(type);
  let targetDir = featureSrcDir;
  let targetTestDir = featureTestsDir;
  let ext = '.ts';
  const pascalName = _.pascalCase(name);
  let fileName = pascalName;
  const renderData = {
    async,
    connect,
    feature,
    Component: pascalName,
    Presenter: pascalName,
    name,
    pascalName,
    action: name,
    selector: name,
    pure
  };
  switch (templateType) {
    case 'Saga':
    case 'Action':
    case 'Selector':
      targetDir = featureSrcReduxDir;
      targetTestDir = featureTestsReduxDir;
      fileName = name;
      break;
    case 'Presenter':
    case 'Component':
      ext = '.tsx';
      break;
    default:
      return console.error(`Error: invalid type ${type} found`);
  }

  if (_.toLower(name) === 'index' || name === 'default') {
    return console.error(`Error: can\'t use ${name} as name`);
  }
  const templates = [];
  // if (!fsX.pathExistsSync(featureSrcDir)) {
    fsX.ensureDirSync(featureSrcDir);
    fsX.ensureDirSync(featureSrcReduxDir);
    templates.push({
      template: path.join(templatesDir, 'route.ts'),
      target: path.join(featureSrcDir, 'route.ts')
    });
    templates.push({
      template: path.join(templatesDir, 'Index.ts'),
      target: path.join(featureSrcDir, 'index.ts')
    });
    fsX.copySync(path.join(templatesDir, 'redux'), featureSrcReduxDir);
  // }
  fsX.ensureDirSync(featureTestsDir);
  fsX.ensureDirSync(featureTestsReduxDir);

  ['', '.test'].forEach(
    (pts) => {
      const extName = `${pts}${ext}`;
      templates.push({
        template: path.join(templatesDir, `${templateType}${extName}`),
        target: path.join(pts === '.test' ? targetTestDir : targetDir, `${pascalName}${extName}`)
      });
    }
  );

  templates.forEach(
    ({ template, target }) => {
      if (fsX.pathExistsSync(template)) {
        const res = _.template(fsX.readFileSync(template, 'utf8'))(renderData);
        const old = fsX.pathExistsSync(target);
        if (old && !force) {
          console.error(`Error: ${target} alreay exists, use -f, --force to overlap it`);
        } else {
          if (old) {
            console.log(`Warning: ${target} overlapped`);
          }
          fsX.writeFileSync(target, res, { encoding: 'utf8' });
        }
      } else {
        console.log(template);
      }
    }
  );
}

commander
  .version(require('../package.json').version)
  .command('add <type> <feature[/name]>')
  .option('-a, --async', 'auto async in features/xxx/index.tsx')
  .option('-c, --connect', 'connect with redux')
  .option('-p, --pure', 'use React.PureComponent insted of React.Component')
  .option('-f, --force', 'overlap if file already exists')
  .action((type, featureAndname, options) => {
    const [ feature, name ] = featureAndname.split('/');
    add(feature, name, type, options);
  })

commander.parse(process.argv);