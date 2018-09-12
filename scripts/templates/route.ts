<% if (async) { %>
const loader = (name) => async () => import('./index')[name];
<% } %>
export default {
  path: '<%= feature %>',
  name: '<%= feature %>',
  childRoutes: [
  ]
};