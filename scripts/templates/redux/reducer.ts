import { Action } from 'redux-actions';

import initialState, { IInitialState } from './initialState';

const reducers: any[] = [
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