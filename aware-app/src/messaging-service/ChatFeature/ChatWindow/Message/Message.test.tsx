import React from 'react';
import { mount } from 'enzyme';

import Message, { UserMessageContents } from './Message';

describe('Message', () => {
    it('should render component correctly', () => {

        let props: UserMessageContents = {
            username: "Ahmed",
            content: "Yeah, I am kinda drunk.",
            timestamp: "December 1, 2018 - 12:22 pm",
            avatar: "/icons8-user-80blue.png"
        }

        const wrapper = mount(
            <Message
                name="Ahmed"
                content={props} />
        );

        expect(wrapper).toMatchSnapshot();
    });
});
