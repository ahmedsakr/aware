import React from 'react';
import { shallow } from 'enzyme';

import ReceivedMessage from './ReceivedMessage';

describe('ReceivedMessage', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<ReceivedMessage debug />);
  
    expect(component).toMatchSnapshot();
  });
});