import * as React from 'react';
import { shallow } from 'enzyme';<% if (connect) { %>
import { <%= Component %> } from '@src/features/<%= feature %>/<%= Component %>';
<% } else {%>
import <%= Component %> from '@src/features/<%= feature %>/<%= Component %>';
<% } %>
describe('<%= feature %>/<%= Component %>', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(<<%= Component %> />);
  });
});
