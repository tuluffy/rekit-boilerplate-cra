import { createSelector } from 'reselect';

const dataSelector = (state: any) => state.data;

export const <%= selector %> = createSelector(
  dataSelector,
  data => data
);