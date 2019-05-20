import React from 'react';
import { shallow } from 'enzyme';

import Messenger from './Messenger';

describe('ChatTitle', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<Messenger debug />);
  
    expect(component).toMatchSnapshot();
  });
});