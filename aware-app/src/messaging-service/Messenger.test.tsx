import React from 'react';
import { shallow } from 'enzyme';

import Messenger from './Messenger';
import io from 'socket.io-client'
jest.mock('socket.io-client');

describe('Messenger', () => {
    it('should render correctly in "debug" mode', () => {
        
        const channel = io();

        const component = shallow(
            <Messenger
                socket={channel}
                username="myusername" />
        );

        expect(component).toMatchSnapshot();
    });
});