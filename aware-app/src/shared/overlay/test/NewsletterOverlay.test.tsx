import React from 'react';
import { shallow } from 'enzyme';

import NewsletterOverlay from './NewsletterOverlay';

describe('NewsletterOverlay', () => {
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
            <NewsletterOverlay
                name="Aware Newsletter"
                title="Subsribe to our Newsletter"
                content={content()}
                footer={footer()} />
        );

        expect(component).toMatchSnapshot();
    });
});