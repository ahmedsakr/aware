import React from 'react';
import { shallow } from 'enzyme';

import ProfilePicture from './ProfilePicture';

describe('ProfilePicture', () => {
    it('should render correctly', () => {

        const component = shallow(
            <ProfilePicture
                picture="my-picture.jpg"
                activity="online"
                instance="message"/>
        );

        expect(component).toMatchSnapshot();
    });
});
