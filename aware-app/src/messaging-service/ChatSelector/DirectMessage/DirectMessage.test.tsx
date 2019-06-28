import React from 'react';
import { shallow } from 'enzyme';

import DirectMessage from './DirectMessage';

describe('DirectMessage', () => {
    it('should render correctly', () => {

        const component = shallow(
            <DirectMessage
                src="my-image.png"
                name="John Doe" />
        );

        expect(component).toMatchSnapshot();
    });
});