import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { Map } from 'immutable';

import rootReducer, { RootReducerMapKey, reducerMap } from '@src/common/rootReducer';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootState = Map<keyof ReturnType<typeof rootReducer>, Map<any, any>>;

export interface IRootState extends RootState {
  get: <K extends RootReducerMapKey, N>(key: K, notSetValue?: Map<any, any> | undefined) => ReturnType<typeof reducerMap[K]>
  // set is not allowed
}

export type RootAction = ReactRouterAction;

export type AyncComponentLoader = () => Promise<any>;

export interface IRoute {
  autoIndexRoute?: boolean
  childRoutes?: IRoute[]
  component?: React.ComponentClass | React.SFC
  exact?: boolean
  isIndex?: boolean
  name?: any
  path: string
  redirect?: boolean
  load?: AyncComponentLoader
}

export interface IObject {
  [key: string]: any 
}