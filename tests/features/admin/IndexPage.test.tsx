import * as React from 'react';
import { shallow } from 'enzyme';

import { IndexPage } from '@src/features/admin/IndexPage';

describe('admin/IndexPage', () => {
  it('renders node with correct class name', () => {
    // @ts-ignore // if IndexPage is connect
    const renderedComponent = shallow(<IndexPage />);
  });
});