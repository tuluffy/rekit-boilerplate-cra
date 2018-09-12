import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';


export function <%= action %>() {
  return {
    type: '<%= _.camelCase(action) %>',
  };
}

export function* do<%= pascalName %>() {
 
}

export function reducer(state, action) {
  switch (action.type) {
    case '<%= _.camelCase(action) %>':
      return {
        ...state,
      };

    default:
      return state;
  }
}