import React from 'react';
import { shallow } from 'enzyme';

import ChatTitle from './ChatTitle';

describe('ChatTitle', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<ChatTitle debug />);
  
    expect(component).toMatchSnapshot();
  });
});