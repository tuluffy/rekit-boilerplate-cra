import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

export const actionType = '<%= feature %>/<%= action %>';

export function <%= action %>() {
  return {
    type: actionType,
  };
}

export function* do<%= pascalName %>() {
  let res;
  try {
    // Do Ajax call or other async request here. delay(20) is just a placeholder.
    res = yield call(delay, 20);
  } catch (err) {
    yield put({
      type: actionType,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: actionType,
    data: res,
  });
}

export function reducer(state: any, action: any) {
  switch (action.type) {
    case actionType:
      return {
        ...state,
      };

    default:
      return state;
  }
}