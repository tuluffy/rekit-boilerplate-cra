// @ts-ignore
const loader = name => async () => {
  const entrance = await import('./');
  return entrance[name];
};

import { IRoute } from '@src/types';

export const childRoutes:IRoute[]  = [
  {
    load: loader('IndexPage'),
    path: 'user'
  }
];
export default {
  path: 'admin',
  name: 'admin',
  childRoutes
};