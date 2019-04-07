import React from 'react';
import { shallow } from 'enzyme';

import DirectMessages from './DirectMessages';

describe('DirectMessages', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<DirectMessages debug />);
  
    expect(component).toMatchSnapshot();
  });
});