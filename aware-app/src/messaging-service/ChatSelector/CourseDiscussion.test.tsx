import React from 'react';
import { shallow } from 'enzyme';

import CourseDiscussion from './CourseDiscussion';

describe('CourseDiscussion', () => {
    it('should render correctly', () => {

        // Stub out the function for now, but we probably need to
        // implement better tests in the future.
        let updateRoom = (course: CourseDiscussion) => { };

        const component = shallow(
            <CourseDiscussion
                updateRoom={updateRoom}
                room="sysc2100"
                src="my-image.png"
                name="SYSC 2100" />
        );

        expect(component).toMatchSnapshot();
    });
});
