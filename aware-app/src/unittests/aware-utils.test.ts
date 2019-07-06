import timestamp from '../aware-utils'

describe('timestamp generation', () => {

    /**
     * This format captures the implemented timestamp format:
     * 
     *  %s %d, %d - %d:%s %s (For example: July 6, 2019 - 12:01 pm)
     */
    const timestampFormat = /^\w*\s\d*\,\s\d*\s-\s\d*\:\w*\s\w*$/;

    it('timestamp matches the expected format', () => {
        let now = timestamp();
        expect(now.match(timestampFormat) !== null).toBe(true);
    })
});