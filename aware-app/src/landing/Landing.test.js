import React from 'react';
import { shallow } from 'enzyme';

import Landing from './Landing';

describe('Landing', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<Landing debug />);
  
    expect(component).toMatchSnapshot();
  });
});