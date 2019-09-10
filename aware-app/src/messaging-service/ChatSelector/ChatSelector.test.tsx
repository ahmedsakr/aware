import React from 'react';
import { shallow } from 'enzyme';

import { ChatSelector } from './ChatSelector';
import io from 'socket.io-client'
import { MessengerChat } from '../api/Messaging';

jest.mock('socket.io-client');

describe('ChatSelector', () => {
    it('should render correctly', () => {

        // Stub out the function for now, but we probably need to
        // implement better tests in the future.
        let selectRoom = (chat: MessengerChat) => { };

        let channel = io();

        const component = shallow(
            <ChatSelector
                requestRoom={selectRoom}
                socket={channel}
                username="myusername"
                activeChat='lol'/>
        );

        expect(component).toMatchSnapshot();
    });
});
