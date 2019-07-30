import React from 'react';
import { shallow } from 'enzyme';
import '../testSetup'

import LandingSlider from './LandingSlider';

describe('LandingSlider', () => {
    it('should render correctly', () => {
        const component = shallow(
            <LandingSlider/>
        );

        expect(component).toMatchSnapshot();
    });
});