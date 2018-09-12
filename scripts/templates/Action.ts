export const actionType = '<%= feature %>/<%= action %>';

export function <%= action %>() {
  return {
    type: actionType
  };
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