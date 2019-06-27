import React from 'react';
import { shallow } from 'enzyme';

import NavBar from './NavBar';

describe('NavBar', () => {
    it('should render correctly', () => {

        const component = shallow(
            <NavBar
                activeRoom="SYSC 2100" />
        );

        expect(component).toMatchSnapshot();
    });
});