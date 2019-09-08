import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

jest.mock('socket.io-client');

describe('App', () => {
    it('should render correctly in "debug" mode', () => {

        const component = shallow(<App debug={true} />);
        expect(component).toMatchSnapshot();
    });
});