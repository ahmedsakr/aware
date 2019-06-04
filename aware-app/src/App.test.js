import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import socket from 'socket.io-client'

jest.mock('socket.io-client');

describe('App', () => {
  it('should render correctly in "debug" mode', () => {

    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });
});