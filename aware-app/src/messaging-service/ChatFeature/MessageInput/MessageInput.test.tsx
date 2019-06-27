import React from 'react';
import { shallow } from 'enzyme';

import MessageInput from './MessageInput';
import { UserMessageContents } from '../ChatWindow/Message/Message';

describe('MessageInput', () => {
    it('should render correctly', () => {

        // Stub out the function for now, but we probably need to
        // implement better tests in the future.
        let sendMessage = (message: UserMessageContents) => { };

        const component = shallow(
            <MessageInput
                sendMessage={sendMessage}
                name="myusername" />
        );

        expect(component).toMatchSnapshot();
    });
});