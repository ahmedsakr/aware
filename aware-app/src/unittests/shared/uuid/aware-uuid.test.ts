
import uuid from '../../../shared/uuid/aware-uuid';

const uuid_format: RegExp = /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/;

describe("uuid generation", () => {
    it("generated uuid must be match the expected form", () => {

        let result: string = uuid();
        expect(result.match(uuid_format) !== null).toBe(true);
    });

    it("generated uuid must be 36 characters long", () => {
        
        let result: string = uuid();
        expect(result.length).toBe(36);
    });

    it("generated uuid must be unique", () => {

        let result: string = uuid();
        let result2: string = uuid();

        expect(result !== result2).toBe(true);
    });
});