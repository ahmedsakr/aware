import React from 'react';
import { shallow } from 'enzyme';

import ProfilePicture from './ProfilePicture';

describe('ProfilePicture', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<ProfilePicture debug />);
  
    expect(component).toMatchSnapshot();
  });
});
