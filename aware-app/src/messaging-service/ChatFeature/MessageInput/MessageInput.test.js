import React from 'react';
import { shallow } from 'enzyme';

import MessageInput from './MessageInput';

describe('MessageInput', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<MessageInput debug />);
  
    expect(component).toMatchSnapshot();
  });
});