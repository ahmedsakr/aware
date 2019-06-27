import React from 'react';
import { shallow } from 'enzyme';

import ActivityPanel from './ActivityPanel';

describe('ActivityPanel', () => {
    it('should render correctly', () => {

        const component = shallow(<ActivityPanel />);

        expect(component).toMatchSnapshot();
    });
});
