import awaredb from '../../../shared/database/awaredb';

jest.genMockFromModule('pg');
jest.mock('pg', () => {
    let queryMock = (text: string) => {
        if (text.startsWith('reject')) {
            return Promise.reject('simulating rejection from pg');
        } else {
            return Promise.resolve({rows: [text], rowCount: 1});
        }

    }

    return {
        Pool: jest.fn(() => ({
            query: queryMock
        }))
    }
});

describe('database queries', () => {

    it("awaredb query adds semicolon if it does not exist", async () => {

        let sampleQuery = "SELECT * from my_table where user = 'john'";
        let result = await awaredb(sampleQuery);
        expect(result).toStrictEqual([`${sampleQuery};`]);
    });

    it("awaredb query returns a rejected promise when the query is null or empty", async () => {

        await awaredb('')
        .then(() => {
            fail("I was expecting a rejection");
        })
        .catch((msg) => {
            expect(msg).toBe('null query string');
        });

        await awaredb(null)
        .then(() => {
            fail("I was expecting a rejection");
        })
        .catch((msg) => {
            expect(msg).toBe('null query string');
        });
    });

    it("awaredb query returns a rejected promise when database query fails", async () => {
        await awaredb('reject')
        .then(() => {
            fail("I was expecting a rejection");
        })
        .catch((msg) => {
            expect(msg).toBe('invalid query');
        });  
    });
});