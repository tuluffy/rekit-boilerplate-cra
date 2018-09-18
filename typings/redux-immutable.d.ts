// Type definitions for redux-immutable v3.0.33
// Project: https://github.com/gajus/redux-immutable
// Definitions by: Pedro Pereira <https://github.com/oizie>
//                 Sebastian Sebald <https://github.com/sebald>
//                 Gavin Gregory <https://github.com/gavingregory>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as Redux from 'redux';
import { Collection } from 'immutable';

interface ReduxImutable {
  combineReducers<S, T>(reducers: Redux.ReducersMapObject, getDefaultState?: () => Collection.Keyed<T, S>): Redux.Reducer<S>;
  combineReducers<S>(reducers: Redux.ReducersMapObject, getDefaultState?: () => Collection.Indexed<S>): Redux.Reducer<S>;
}

declare module 'redux-immutable' {
  export = ReduxImutable
}