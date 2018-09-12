export const <%= _.toUpper(action) %> = '<%= feature %>/<%= _.toUpper(action) %>';

export function <%= action %>() {
  return {
    type: <%= _.toUpper(action) %>
  };
}

export function <%= action %>Reducer(state: any, action: any) {
  switch (action.type) {
    case <%= _.toUpper(action) %>:
      return {
        ...state,
      };

    default:
      return state;
  }
}