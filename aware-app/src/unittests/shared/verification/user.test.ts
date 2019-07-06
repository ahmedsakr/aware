import * as user from '../../../shared/verification/user';

describe("username validation", () => {
    it("username cannot be undefined", () => {

        let username: user.AccountField = undefined;
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_UNDEFINED_OR_NULL);
    });

    it("username cannot be null", () => {

        let username: user.AccountField = null;
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_UNDEFINED_OR_NULL);
    });

    it("username cannot be smaller than 3 characters", () => {

        let username: user.AccountField = `ze`;
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_OUT_OF_BOUNDS);
    });

    it("username cannot be greater than 32 characters", () => {
        
        // 33 characters
        let username: user.AccountField = `abcdeabcdeabcdeabcdeabcdeabcdeabc`;
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_OUT_OF_BOUNDS);
    });

    it("username cannot contain single quotations", () => {

        let username: user.AccountField = `john'doe`;
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_ILLEGAL);
    });

    it("username cannot contain double quotations", () => {

        let username: user.AccountField = `j"ohndoe`;
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_ILLEGAL);
    });

    it("username cannot contain backticks", () => {

        let username: user.AccountField = 'johndoe`';
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_ILLEGAL);
    });

    it("username cannot have symbols", () => {

        let username: user.AccountField = 'bob!the_builder9000';
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_ILLEGAL);
    });

    it("username can be anywhere between 3 and 32 characters", () => {

        let username: user.AccountField = 'bobthebuilder9000';
        const result: user.FieldValidationResult = user.verifyUsername(username);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALIDATED);
    });
});

describe("password validation", () => {
    it("password cannot be undefined", () => {

        let password: user.AccountField = undefined;
        const result: user.FieldValidationResult = user.verifyPassword(password);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_UNDEFINED_OR_NULL);
    });

    it("password cannot be null", () => {

        let password: user.AccountField = null;
        const result: user.FieldValidationResult = user.verifyPassword(password);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_UNDEFINED_OR_NULL);
    });

    it("password cannot be smaller than 8 characters", () => {

        let password: user.AccountField = `pass123`;
        const result: user.FieldValidationResult = user.verifyPassword(password);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_OUT_OF_BOUNDS);
    });

    it("password cannot be greater than 128 characters", () => {

        // 129 characters
        let password: user.AccountField =
            `abcdeabcdeabcdeabcdeabcdeabcdeab` +
            `abcdeabcdeabcdeabcdeabcdeabcdeab` +
            `abcdeabcdeabcdeabcdeabcdeabcdeab` +
            `abcdeabcdeabcdeabcdeabcdeabcdeab` +
            `a`;
        const result: user.FieldValidationResult = user.verifyPassword(password);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALUE_OUT_OF_BOUNDS);
    });

    it("password can be anywhere between 8 and 128 characters", () => {

        let password: user.AccountField = 'myverylongandsecurepassword1234591abcde';
        const result: user.FieldValidationResult = user.verifyPassword(password);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALIDATED);
    });

    it("password can have symbols", () => {

        let password: user.AccountField = 'myverylo#_ngandsecurep@&assword1234591abcde!';
        const result: user.FieldValidationResult = user.verifyPassword(password);
        expect(result).toBe(user.FieldValidationResult.FIELD_VALIDATED);
    });
});