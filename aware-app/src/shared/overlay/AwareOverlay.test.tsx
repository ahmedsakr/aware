import React from 'react';
import { shallow } from 'enzyme';

import AwareOverlay from './AwareOverlay';

describe('AwareOverlay', () => {
    it('should render correctly in "debug" mode', () => {

        let content = () => {
            return (
                <div>
                    testing body content!
                </div>
            );
        }

        let footer = () => {
            return (
                <div>
                    testing footer content!
                </div>
            );
        }

        const component = shallow(
            <AwareOverlay
                debug={true}
                name="Test overlay"
                title="Testing the overlay"
                content={content()}
                footer={footer()} />
        );

        expect(component).toMatchSnapshot();
    });
});