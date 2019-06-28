import React from 'react';
import { shallow } from 'enzyme';

import DirectMessages from './DirectMessages';

describe('DirectMessages', () => {
    it('should render correctly', () => {

        const component = shallow(<DirectMessages />);

        expect(component).toMatchSnapshot();
    });
});