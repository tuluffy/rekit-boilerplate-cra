<% if (async) { %>// @ts-ignore
const loader = name => async () => import('./index')[name];
<% } %>
export default {
  path: '<%= feature %>',
  name: '<%= feature %>',
  childRoutes: [
  ]
};