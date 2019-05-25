import React from 'react';
import { shallow } from 'enzyme';

import NewsletterOverlay from './NewsletterOverlay';

describe('NewsletterOverlay', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<NewsletterOverlay debug />);
  
    expect(component).toMatchSnapshot();
  });
});