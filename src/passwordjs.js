'use strict';

const fs = require('fs');
const { makepassword } = require('./makepassword');
const { validateCredentials } = require('./validateCredentials');

async function passwordjs() {
    if (process.argv.length !== 5) {
        // node ./passwordjs.js ../auth/password.txt email password
        return false;
    }

    const filename = process.argv[2];
    const email = process.argv[3];
    const password = process.argv[4];

    try {
        const isValid = await validateCredentials(filename, email, password);
        if (!isValid) {
            console.log('false');
            return false;
        }

        await makepassword(filename, '../auth/password.enc.txt');

        console.log('true');
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

if (require.main === module) {
    passwordjs();
}

module.exports = { passwordjs };
