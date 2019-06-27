import React from 'react';
import { shallow } from 'enzyme';

import Login from './Login';
import io from 'socket.io-client';

jest.mock('socket.io-client');

describe('Login', () => {
    it('should render correctly', () => {

        // Stub out the function for now, but we probably need to
        // implement better tests in the future.
        let setUsername = (username: string) => { }
        let switchStub = () => { }
        let channel = io();

        const component = shallow(
            <Login
                setUsername={setUsername}
                switch={switchStub}
                socket={channel} />
        );

        expect(component).toMatchSnapshot();
    });
});