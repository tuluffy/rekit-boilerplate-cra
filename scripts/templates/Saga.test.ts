import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  <%= _.toUpper(action) %>,
  <%= action %>,
  do<%= pascalName %>,
  <%= action %>Reducer
} from '@src/features/<%= feature %>/redux/<%= action %>';


describe('<%= feature %>/redux/<%= action %>', () => {
  it('correct action by <%= action %>', () => {
    expect(<%= action %>()).toHaveProperty('type', <%= _.toUpper(action) %>);
  });
  const generator = do<%= pascalName %>();

  it('calls delay when receives a begin action', () => {
    expect(generator.next().value).toMatchObject(call(delay, 20));
  });

  it('handles action type <%= action %> correctly', () => {
    const prevState = { };
    const state = <%= action %>Reducer(
      prevState,
      { type: <%= _.toUpper(action) %> }
    );
    expect(state === prevState).toBeFalsy();
    expect(state).toEqual(prevState);
  });
});