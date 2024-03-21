'use strict';

const fs = require('fs');
const { makepassword } = require('./makepassword');

async function passwordjs() {
    if (process.argv.length !== 5) {
        console.log('Usage: node passwordjs.js <password_file> <email> <password>');
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

        //check if email exists
        const passwords = fs.readFileSync(filename, 'utf8').split('\n');
        const emailExists = passwords.some(line => {
            const [existingEmail] = line.split(':');
            return existingEmail.trim() === email.trim();
        });

        if (!emailExists){
            return false
        }

        //check password is empty
        if (!password || password.trim() === '') {
            //console.log('Password is empty.');
            return false;
        }

        // Check if password meets criteria --add more later
        if (password.length < 12) {
            console.log('false');
            return false;
        }

        // Append new email and password to password file
        fs.appendFileSync(filename, `${email}:${password}\n`);

        // update db with  new credentials
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