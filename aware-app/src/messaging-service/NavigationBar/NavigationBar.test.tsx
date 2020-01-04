import React from 'react';
import { shallow } from 'enzyme';

import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
    it('should render correctly', () => {

        const component = shallow(
            <NavigationBar />
        );

        expect(component).toMatchSnapshot();
    });
});