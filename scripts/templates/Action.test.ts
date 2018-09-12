import {
  <%= _.toUpper(action) %>,
  <%= action %>,
  <%= action %>Reducer
} from '@src/features/<%= feature %>/redux/<%= action %>';


describe('<%= feature %>/redux/<%= action %>', () => {
  it('returns correct action by <%= action %>', () => {
    expect(<%= action %>()).toHaveProperty('type', <%= _.toUpper(action) %>);
  });

  it('handles action type <%= action %> correctly', () => {
    const prevState = {};
    const state = <%= action %>Reducer(
      prevState,
      { type: <%= _.toUpper(action) %> }
    );
    expect(state === prevState).toBeFalsy();
    expect(state).toEqual(prevState);
  });
});