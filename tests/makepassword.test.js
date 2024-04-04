const fs = require('fs');
const { makepassword } = require('../src/makepassword');
const User = require("../models/User");
const mongoose = require("mongoose");


describe('makepassword function', () => {
    const passwordFileName = './passwordtest.txt';
    const passwordEncFileName = './passwordtest.enc.txt';

    beforeAll(async () => {
        fs.writeFileSync(passwordFileName, 'user1@example.com:password1\n');
        await mongoose.connect('mongodb+srv://bryanta21:s5aVWFsXGvRLcX11@cluster0.qdvgn0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    });


    afterAll(async() => {
        fs.unlinkSync(passwordFileName);
        fs.unlinkSync(passwordEncFileName);
        await mongoose.disconnect();
    });

    test('should execute successfully', async () => {
        await expect(makepassword(passwordFileName, passwordEncFileName)).resolves.not.toThrow();
    }); //pass

    test('create encrypted password file', async () => {
        await makepassword(passwordFileName, passwordEncFileName);
        expect(fs.existsSync(passwordEncFileName)).toBe(true);
    });//pass

    test('handle non-existing password file', async () => {
        const nonExistingFile = 'nonexistent.txt';
        await expect(makepassword(nonExistingFile, passwordEncFileName)).resolves.not.toThrow();
    });//pass

    test('handle invalid input file format', async () => {
        fs.writeFileSync(passwordFileName, 'invalid\nuser3@example.com:password3\n');
        await expect(makepassword(passwordFileName, passwordEncFileName)).resolves.not.toThrow();
        fs.writeFileSync(passwordFileName, 'user1@example.com:password1\n');
    });//pass

    test('disconnect database', async () => {
        const disconnectMock = jest.spyOn(mongoose.connection, 'close');
        await makepassword(passwordFileName, passwordEncFileName);
        expect(disconnectMock).toHaveBeenCalled();
        disconnectMock.mockRestore();
    });//pass

});
