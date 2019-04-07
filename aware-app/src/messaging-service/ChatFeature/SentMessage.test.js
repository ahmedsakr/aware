import React from 'react';
import { shallow } from 'enzyme';

import SentMessage from './SentMessage';

describe('SentMessage', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<SentMessage debug />);
  
    expect(component).toMatchSnapshot();
  });
});