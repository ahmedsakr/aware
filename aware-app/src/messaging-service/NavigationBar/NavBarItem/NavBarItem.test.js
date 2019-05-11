import React from 'react';
import { shallow } from 'enzyme';

import NavBarItem from './NavBarItem';

describe('NavBarItem', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<NavBarItem src="/icons8-monitor-64.png" name="sysc 2100" debug />);
  
    expect(component).toMatchSnapshot();
  });
});