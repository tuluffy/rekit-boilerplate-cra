#! /usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const fsX = require('fs-extra');
const path = require('path');
const _ = require('lodash');

_.pascalCase = _.flow(_.camelCase, _.upperFirst);
_.upperSnakeCase = _.flow(_.snakeCase, _.toUpper);

const baseSourceDir = path.join(__dirname, '..', 'src');
const baseTestsDir = path.join(__dirname, '..', 'tests');
const templatesDir = path.join(__dirname, 'templates');

const featureMateriels = ['redux', 'sagas', 'selectors', 'services'];
const add = (feature, name, type, options = {}) => {
  const templateType = _.upperFirst(type); // Abb like
  const templates = [];

  if (!type || !type.trim()) {
    return console.log(`Error: invalid type '${type}' found`);
  }

  // format
  feature = _.kebabCase(feature); // a-a-b like
  const lowerName = _.lowerCase(name);
  const camelName = _.camelCase(name); // aAB like
  const pascalName = _.pascalCase(name); // WordWordWord like
  
  let actionName = `do${pascalName}`;
  let reducerName = `apply${pascalName}`;
  let sagaName = `saga${pascalName}`; // ?
  let selectorName = `get${pascalName}`;
  let presenterName = `SFC${pascalName}`;
  let componentName = pascalName;
  let constsName = _.upperSnakeCase(pascalName);

  const sourceDir = path.join(baseSourceDir, 'features', feature);
  const testsDir = path.join(baseTestsDir, 'features', feature);

  let targetSourceDir = sourceDir;
  let targetTestsDir = testsDir;

  const featureIndex = path.join(sourceDir, 'index.ts');

  // init feature
  if (!fsX.pathExistsSync(sourceDir)) {
    fsX.ensureDirSync(sourceDir);
    fsX.ensureDirSync(testsDir);
    templates.push({
      template: path.join(templatesDir, 'route.ts.tmpl'),
      target: path.join(sourceDir, 'route.ts')
    });
    templates.push({
      template: path.join(templatesDir, 'Index.ts.tmpl'),
      target: featureIndex
    });
    featureMateriels.forEach(
      (materiel) => {
        fsX.ensureDirSync(path.join(sourceDir, materiel));
        fsX.ensureDirSync(path.join(testsDir, materiel));
        fsX.copySync(path.join(templatesDir, materiel), path.join(sourceDir, materiel));
      }
    )
  }

  if (!name || !name.trim()) {
    return;
  }

  // options
  const { async = true, connect, force, pure, url } = options;
  let fileName = camelName;
  let exportCode = '';
  let ext = '.ts';
  const isPage = url && !pascalName.match(/Page$/g);
  switch (templateType) {
    case 'Saga':
      targetSourceDir = path.join(sourceDir, 'sagas');
      targetTestsDir = path.join(testsDir, 'sagas');
      exportCode = '';
      break;
    case 'Action':
      targetSourceDir = path.join(sourceDir, 'redux');
      targetTestsDir = path.join(testsDir, 'redux');
      exportCode = {
        [path.join(targetSourceDir, 'actions.ts')]: `export { ${actionName} } from './${fileName}';`
      }
      break;
    case 'Selector':
      targetSourceDir = path.join(sourceDir, 'selectors');
      targetTestsDir = path.join(testsDir, 'selectors');
      exportCode = {
        [path.join(targetSourceDir, 'index.ts')]: `export { ${selectorName} } from './${fileName}';`
      }
      break;
    case 'Presenter':
      // stateless component
      presenterName = fileName = `SFC${pascalName}${isPage ? 'Page' : ''}`;
      exportCode = {
        [path.join(targetSourceDir, 'index.ts')]: `export { default as ${presenterName} } from './${fileName}'`
      }
      ext = '.tsx';
      break;
    case 'Component':
      componentName = fileName = `${pascalName}${isPage ? 'Page' : ''}`;
      exportCode = {
        [path.join(targetSourceDir, 'index.ts')]: `export { default as ${componentName} } from './${fileName}'`
      }
      ext = '.tsx';
      break;
    default:
      return console.error(`Error: invalid type ${type} found`);
  }

  fsX.ensureDirSync(targetSourceDir);
  fsX.ensureDirSync(targetTestsDir);

  const renderData = {
    async: true,
    connect,
    force,
    pure,
    feature,
    url,

    actionName,
    reducerName,
    sagaName,
    pascalSagaName: _.pascalCase(sagaName),
    selectorName,
    presenterName,
    componentName,
    constsName,

    lowerName,
    camelName,
    pascalName,

    fileName
  };

  if (lowerName === 'index' || lowerName === 'actions' || lowerName === 'reducer'
    || camelName === 'initialState' || name === 'default') {
    return console.error(`Error: can\'t use ${name} as name`);
  }

  ['', '.test'].forEach(
    (pts) => {
      const extName = `${pts}${ext}`;
      templates.push({
        exportCode,
        template: path.join(templatesDir, `${templateType}${extName}.tmpl`),
        target: path.join(pts === '.test' ? targetTestsDir : targetSourceDir, `${fileName}${extName}`)
      });
    }
  );

  templates.forEach(
    ({ template, target, exportCode }) => {
      if (fsX.pathExistsSync(template)) {
        const res = _.template(fsX.readFileSync(template, 'utf8'))(renderData);
        const old = fsX.pathExistsSync(target);
        if (old && !force) {
          console.error(`Error: ${target} alreay exists, use -f, --force to overlap it`);
        } else {
          if (old) {
            console.log(`Warning: overlap ${target}`);
          }
          fsX.writeFileSync(target, res.replace(/[\n]{3,}/g, '\n\n').trim(), { encoding: 'utf8' });
        }
        if (exportCode) {
          Object.keys(exportCode).forEach(
            (fileToInject) => {
              const code = exportCode[fileToInject];
              if (exportCode[fileToInject] && fsX.readFileSync(fileToInject, { encoding: 'utf8' }).indexOf(code.trim()) === -1) {
                fsX.writeFileSync(
                  fileToInject, 
                  code,
                  { encoding: 'utf8', flag: 'a+' }
                );
              }
            }
          )
        }
      } else {
        console.log(`Error: template ${template} not found`);
      }
    }
  );
}

commander
  .version(require('../package.json').version)
  .command('add <type> <feature[/name]>')
  // .option('-a, --async', 'auto async in features/xxx/index.tsx')
  .option('-c, --connect', 'connect with redux')
  .option('-p, --pure', 'use React.PureComponent insted of React.Component')
  .option('-f, --force', 'overlap if file already exists')
  .option('-u, --url', '\'create NamePage\' like Component')
  .action((type, featureAndname, options) => {
    const [ feature, name ] = featureAndname.split('/');
    add(feature, name, type, options);
  })

commander.parse(process.argv);