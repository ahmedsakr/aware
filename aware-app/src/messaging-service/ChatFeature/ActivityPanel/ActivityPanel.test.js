import React from 'react';
import { shallow } from 'enzyme';

import ActivityPanel from './ActivityPanel';

describe('ActivityPanel', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<ActivityPanel debug />);
  
    expect(component).toMatchSnapshot();
  });
});
