import React from 'react';
import { mount } from 'enzyme';

import ChatWindow from './ChatWindow';  

describe('ChatWindow', () => {
    it('should render component correctly', () => {
        const props = [
            {
              studentName: "Ahmed",
              text: "Yeah, I am kinda drunk.",
              timestamp: "December 1, 2018 - 12:22 pm",
              avatar: "/icons8-user-80blue.png"
            },
            {
              studentName: "Josh",
              text: "Same broda.",
              timestamp: "December 1, 2018 - 12:22 pm",
              avatar: "/icons8-user-80blue.png"
            },
            {
              studentName: "Arsalan",
              text: "guys, I am hungry.",
              timestamp: "December 1, 2018 - 12:22 pm",
              avatar: "/icons8-user-80blue.png"
            }
        ]

        Element.prototype.scrollIntoView = jest.fn();  // set scrollIntoView to a spy
        const wrapper = mount(<ChatWindow messages = {props} />);
        expect(wrapper).toMatchSnapshot();
        expect(Element.prototype.scrollIntoView).toHaveBeenCalled();  // PASSES
      });
});