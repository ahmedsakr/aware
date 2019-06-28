import React from 'react';
import { shallow } from 'enzyme';

import NavBarLink from './NavBarLink';

describe('NavBarLink', () => {
    it('should render correctly', () => {

        const component = shallow(
            <NavBarLink
                className="SYSC 2100"
                icon="/icons8-monitor-64.png"
                name="sysc 2100" />
        );

        expect(component).toMatchSnapshot();
    });
});