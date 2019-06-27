import React from 'react';
import { shallow } from 'enzyme';

import AwareOverlay from './AwareOverlay';

describe('AwareOverlay', () => {
    it('should render correctly', () => {

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
                name="Test overlay"
                title="Testing the overlay"
                content={content()}
                footer={footer()} />
        );

        expect(component).toMatchSnapshot();
    });
});