import React from 'react';
import { shallow } from 'enzyme';

import CourseDiscussion from './CourseDiscussion';

describe('CourseDiscussion', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<CourseDiscussion debug />);
  
    expect(component).toMatchSnapshot();
  });
});
