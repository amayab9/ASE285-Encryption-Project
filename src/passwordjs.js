'use strict';

const fs = require('fs');
const { makepassword } = require('./makepassword');
const { validateCredentials } = require('./validateCredentials');

async function passwordjs() {
    if (process.argv.length !== 5) {
        // nodemon ./passwordjs.js ../auth/password.txt email password
        console.log('Usage: nodemon passwordjs.js <password_file> <email> <password>');
        return false;
    }

    const filename = process.argv[2];
    const email = process.argv[3];
    const password = process.argv[4];

    try {
        // Check if file exists
        if (!fs.existsSync(filename)) {
            console.log(`${filename} does not exist.`);
            return false;
        }

        // Check if the email exists in the password file
        const emailExists = await validateCredentials(filename, email, password);
        if (!emailExists) {
            console.log('false');
            return false;
        }

        // Call makepassword to encrypt and store the password
        await makepassword(filename, '../auth/password.enc.txt');

        console.log('true');
        return true;
    } catch (error) {
        console.error('An error occurred:', error);
        return false;
    }
}

if (require.main === module) {
    passwordjs();
}

module.exports = { passwordjs };
