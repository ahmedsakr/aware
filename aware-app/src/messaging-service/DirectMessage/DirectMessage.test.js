import React from 'react';
import { shallow } from 'enzyme';

import DirectMessage from './DirectMessage';

describe('DirectMessage', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<DirectMessage debug />);
  
    expect(component).toMatchSnapshot();
  });
});