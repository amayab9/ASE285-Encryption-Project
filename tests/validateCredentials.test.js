const { validateCredentials } = require('../src/validateCredentials');
const fs = require('fs');
describe('validateCredentials function', () => {
    const passwordFileName = './passwordtest.txt';

    beforeAll(() => {
        fs.writeFileSync(passwordFileName, 'user1@example.com:password1\n');
    });

    afterAll(() => {
        fs.unlinkSync(passwordFileName);
    });

    test('return true - valid credentials', async () => {
        const isValid = await validateCredentials(passwordFileName, 'user1@example.com', 'password1');
        expect(isValid).toBe(true);
    });

    test('invalid email = false', async () => {
        const isValid = await validateCredentials(passwordFileName, 'invalid@example.com', 'password1');
        expect(isValid).toBe(false);
    });

    test('invalid password = false', async () => {
        const isValid = await validateCredentials(passwordFileName, 'user1@example.com', 'invalidpassword');
        expect(isValid).toBe(false);
    });

    test('non-existing user', async () => {
        const isValid = await validateCredentials(passwordFileName, 'nonexisting@example.com', 'password1');
        expect(isValid).toBe(false);
    });

    test('no password = false', async () => {
        const isValid = await validateCredentials(passwordFileName, 'user1@example.com', '');
        expect(isValid).toBe(false);
    });
});
