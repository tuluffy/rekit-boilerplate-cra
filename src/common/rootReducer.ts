// @ts-ignore
import * as Immutable from 'immutable';
import { Action } from 'redux-actions';
// @ts-ignore // since using @types/redux-immutable cause problem
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import homeReducer from '@features/home/redux/reducer';
import commonReducer from '@features/common/redux/reducer';
import adminReducer from '@features/admin/redux/reducer';

const pureRootInitialState = {
  location: null
}

const RootInitialState: IRootInitialState = Immutable.Map(pureRootInitialState);

export type RootInitialState = typeof pureRootInitialState;

export interface IRootInitialState extends Immutable.Map<any, any> {
  get: (key: keyof RootInitialState, notSetValue?: Immutable.Map<any, any> | any) => any
  set: (key: keyof RootInitialState, value: any) => any
}

function routerReducer(state = RootInitialState, action: Action<any>): IRootInitialState {
  if (action.type === LOCATION_CHANGE) {
    return state
      .set('location', { location: action.payload })
  }
  return state;
}

export const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  admin: adminReducer
};


export type RootReducerMap = typeof reducerMap;
export type RootReducerMapKey = keyof RootReducerMap;
export default combineReducers(reducerMap);
