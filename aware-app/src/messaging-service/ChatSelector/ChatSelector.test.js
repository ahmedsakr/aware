import React from 'react';
import { shallow } from 'enzyme';

import ChatSelector from './ChatSelector';

describe('ChatSelector', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<ChatSelector debug />);
  
    expect(component).toMatchSnapshot();
  });
});
