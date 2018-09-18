import * as Immutable from 'immutable';
import {
  LOGIN,
  doLogin,
  applyLogin
} from '@src/features/admin/redux/login';

describe('admin/redux/login', () => {
  it('returns correct action by doLogin', () => {
    expect(doLogin()).toHaveProperty('type', LOGIN);
  });

  it('handles action type doLogin correctly', () => {
    const prevState = Immutable.Map({});
    const state = applyLogin(
      prevState,
      { type: LOGIN }
    );
    expect(state === prevState).toBeFalsy();
    expect(state).toEqual(prevState);
  });
});