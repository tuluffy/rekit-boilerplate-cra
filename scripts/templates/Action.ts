export function <%= action %>() {
  return {
    type: '<%= action %>'
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case '<%= action %>':
      return {
        ...state,
      };

    default:
      return state;
  }
}