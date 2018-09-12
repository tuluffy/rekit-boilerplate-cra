import {
  actionType,
  <%= action %>,
  reducer
} from '@src/features/<%= feature %>/redux/<%= action %>';


describe('<%= feature %>/redux/<%= action %>', () => {
  it('returns correct action by <%= action %>', () => {
    expect(<%= action %>()).toHaveProperty('type', actionType);
  });

  it('handles action type <%= action %> correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: actionType }
    );
    expect(state === prevState).toBeFalsy();
    expect(state).toEqual(prevState);
  });
});