import { Action } from 'redux-actions';

import initialState, { IInitialState } from './initialState';
import { applyLogin } from './login';

const reducers: any[] = [
  applyLogin
];

export default function reducer(state = initialState, action: Action<any>): IInitialState {
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      state = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), state);
}