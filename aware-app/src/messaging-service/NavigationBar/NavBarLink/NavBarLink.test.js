import React from 'react';
import { shallow } from 'enzyme';

import NavBarLink from './NavBarLink';

describe('NavBarLink', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<NavBarLink src="/icons8-monitor-64.png" name="sysc 2100" debug />);
  
    expect(component).toMatchSnapshot();
  });
});