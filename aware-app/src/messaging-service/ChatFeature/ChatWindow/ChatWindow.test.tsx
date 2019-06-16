import React from 'react';
import { mount } from 'enzyme';

import ChatWindow from './ChatWindow';
import { UserMessageContents } from './Message/Message'

describe('ChatWindow', () => {
    it('should render component correctly', () => {
        let props: UserMessageContents[] = [
            {
                username: "Ahmed",
                content: "Yeah, I am kinda drunk.",
                timestamp: "December 1, 2018 - 12:22 pm",
                avatar: "/icons8-user-80blue.png"
            },
            {
                username: "Josh",
                content: "Same broda.",
                timestamp: "December 1, 2018 - 12:22 pm",
                avatar: "/icons8-user-80blue.png"
            },
            {
                username: "Arsalan",
                content: "guys, I am hungry.",
                timestamp: "December 1, 2018 - 12:22 pm",
                avatar: "/icons8-user-80blue.png"
            }
        ]

        Element.prototype.scrollIntoView = jest.fn();
        const wrapper = mount(
            <ChatWindow
                messages={props}
                name="myusername" />
        );

        expect(wrapper).toMatchSnapshot();
        expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
});