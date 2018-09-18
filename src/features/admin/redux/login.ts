import * as Immutable from 'immutable';
import { createAction, handleAction, Action } from 'redux-actions';

import { IInitialState } from './initialState';

export const LOGIN = 'admin/LOGIN';

export const doLogin = createAction(LOGIN);

export interface ILoginState {
  userInfo: {
    username?: any
    photo?: any
  }
}

export const pureLoginState: ILoginState = {
  userInfo: {
    username: null,
    photo: null
  } 
};

const defaultState: Immutable.Map<any, any> = Immutable.Map(pureLoginState);

export const applyLogin = handleAction(
  doLogin,
  (state: IInitialState, action: Action<any>) => {
    return state;
  },
  defaultState
);