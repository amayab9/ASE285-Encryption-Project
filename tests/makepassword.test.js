const fs = require('fs');
const { makepassword } = require('../src/makepassword');
const User = require("../models/User");
const mongoose = require("mongoose");
const { readFile } = require('../util/utility');

describe('makepassword function', () => {
    const passwordFileName = './passwordtest.txt';
    const passwordEncFileName = './passwordtest.enc.txt';

    beforeAll(async () => {
        fs.writeFileSync(passwordFileName, 'user1@example.com:password1\n');
        await mongoose.connect('mongodb+srv://bryanta21:BEZOZ62Zfu4ueAtu@cluster0.qdvgn0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });

    afterAll(async () => {
        fs.unlinkSync(passwordFileName);
        fs.unlinkSync(passwordEncFileName);
        await mongoose.disconnect();
    });

    test('should execute successfully', async () => {
        await expect(makepassword(passwordFileName, passwordEncFileName)).resolves.not.toThrow();
    });

    test('create encrypted password file', async () => {
        await makepassword(passwordFileName, passwordEncFileName);
        expect(fs.existsSync(passwordEncFileName)).toBe(true);
    });

    test('handle non-existing password file', async () => {
        const nonExistingFile = 'nonexistent.txt';
        await expect(makepassword(nonExistingFile, passwordEncFileName)).resolves.not.toThrow();
    });

    test('handle invalid input file format', async () => {
        fs.writeFileSync(passwordFileName, 'invalid\nuser3@example.com:password3\n');
        await expect(makepassword(passwordFileName, passwordEncFileName)).resolves.not.toThrow();
        fs.writeFileSync(passwordFileName, 'user1@example.com:password1\n');
    });

    test('disconnect database', async () => {
        const disconnectMock = jest.spyOn(mongoose.connection, 'close');
        await makepassword(passwordFileName, passwordEncFileName);
        expect(disconnectMock).toHaveBeenCalled();
        disconnectMock.mockRestore();
    });

    test('clear password file after completion', async () => {
        fs.writeFileSync(passwordFileName, 'user1@example.com:password1\nuser2@example.com:password2\n');
        await makepassword(passwordFileName, passwordEncFileName);
        const fileContent = fs.readFileSync(passwordFileName, 'utf8');
        expect(fileContent).toBe('');
    });

});