import React from 'react';
import { shallow } from 'enzyme';

import AwareOverlay from './AwareOverlay';

describe('AwareOverlay', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<AwareOverlay debug />);
  
    expect(component).toMatchSnapshot();
  });
});