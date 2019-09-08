import React from 'react';
import { shallow } from 'enzyme';

import Landing from './Landing';
import io from 'socket.io-client';

jest.mock('socket.io-client');

describe('Landing', () => {
    it('should render correctly', () => {

        // Stub out the function for now, but we probably need to
        // implement better tests in the future.
        let loadMessenger = (username: string) => { };

        let channel = io();
        const component = shallow(
            <Landing
                loadMessenger={loadMessenger}
                socket={channel} />
        );

        expect(component).toMatchSnapshot();
    });
});