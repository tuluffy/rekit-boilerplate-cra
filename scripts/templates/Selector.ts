import { createSelector } from 'reselect';

const dataSelector = state => state.data;

export const <%= _.camelCase(selector) %> = createSelector(
  dataSelector,
  data => data
);