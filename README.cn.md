# README
This is the boilerplate created by create-react-app-typescript & webpack4 to generate a Rekit app.

!RekitStudio Supported
!Rekit cli Supported

## 方案

redux + router + redux-immutable + saga + typescript

## 使用

```
git clone
建议使用  visual studio code，可以享受到完善的 autocomplete
```

## 启动

```
npm install
npm start
npm test
```

## 脚手架

### 创建 action

命名遵循驼峰格式: 动词 + 名词，例如 login，pullUserInfo

实际生成: doLogin, loginReducer

```
./scripts/kit.js add action feature/actionName
```

创建完成，目前需要手动操作:

在 ./initialState.ts 内引入

```
const pureInitialState = {
  ...pureLoginState // 引入
};
```

在 ./reducer.ts 内引入

```
import { applyLogin } from './login'; // 引入

const reducers: any[] = [
  applyLogin // 引入
];
```


### 创建 saga 异步 action

命名遵循驼峰格式: 动词 + 名词，例如 login，pullUserInfo

实际生成 action: doLogin, loginReducer, sagaLogin【暂定，可能会校正为一系列 watchLogin 】

```
./scripts/kit.js add saga feature/sagaName
```

saga 的引入操作通 action，但多出以下几步:

在 src/common/rootSaga.ts 内引入

```
const featureSagas: any[] = [
];
``


### 创建 Component

用以创建容器组件以及具有 state 的组件

命名遵循驼峰格式，不能使用 default, index

```
./scripts/kit.js add component feature/componentName
-c : connect redux store
-u : 路由页面，存在 this.props.match.params
-p : pureComponent，创建无状态组件

-f : 慎用，覆盖已有
```

使用 -u 情形下，需要手动在 src/feature/route.ts 内引入

```
export const childRoutes:IRoute[]  = [
  {
    load: loader('IndexPage'), // 引入
    path: 'user' // 引入
  }
];
```

### 创建 Presenter

命名遵循驼峰格式，不能使用 default, index

```
./scripts/kit.js add presenter feature/presenterName
-c : connect redux store
-u : 路由页面，存在 props.match.params
```