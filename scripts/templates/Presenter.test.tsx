import * as React from 'react';
import { shallow } from 'enzyme';
import { <%= Presenter %> } from '@src/features/<%= feature %>/<%= Presenter %>';

describe('<%= feature %>/Presenter_<%= Presenter %>', () => {
  it('renders node with correct class name', () => {
    const renderedPresenter = shallow(<<%= Presenter %> />);
  });
});
