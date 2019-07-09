import React from 'react';
import { shallow } from 'enzyme';

import ChatSelector from './ChatSelector';
import io from 'socket.io-client'

jest.mock('socket.io-client');

describe('ChatSelector', () => {
    it('should render correctly', () => {

        // Stub out the function for now, but we probably need to
        // implement better tests in the future.
        let selectRoom = (roomName: string, username: string) => { };

        let channel = io();

        const component = shallow(
            <ChatSelector
                selectRoom={selectRoom}
                socket={channel}
                username="myusername" />
        );

        expect(component).toMatchSnapshot();
    });
});
