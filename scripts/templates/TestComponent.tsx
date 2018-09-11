import * as React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '@src/features/home/DefaultPage';

describe('home/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(<DefaultPage />);

  });
});
