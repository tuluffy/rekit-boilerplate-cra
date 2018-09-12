import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  actionType,
  <%= action %>,
  do<%= pascalName %>,
  reducer
} from '@src/features/<%= feature %>/redux/<%= action %>';


describe('<%= feature %>/redux/<%= action %>', () => {
  it('correct action by <%= action %>', () => {
    expect(<%= action %>()).toHaveProperty('type', actionType);
  });
  const generator = do<%= pascalName %>();

  it('calls delay when receives a begin action', () => {
    expect(generator.next().value).toMatchObject(call(delay, 20));
  });

  it('handles action type <%= action %> correctly', () => {
    const prevState = { };
    const state = reducer(
      prevState,
      { type: actionType }
    );
    expect(state === prevState).toBeFalsy();
    expect(state).toEqual(prevState);
  });
});