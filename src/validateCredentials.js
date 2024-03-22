'use strict';

const fs = require('fs');


function checkIfEmailExists(filename, email) {
    const passwords = fs.readFileSync(filename, 'utf8').split('\n');
    return passwords.some(line => {
        const [existingEmail] = line.split(':');
        return existingEmail.trim() === email.trim();
    });
}

function checkPasswordStrength(password){
    //check length
    if (password.length < 12) {
        console.log('false');
        return false;
    }
    return true;
}

async function validateCredentials(filename, email, password) {
    try {
        //file exists?
        if (!fs.existsSync(filename)) {
            console.log(`${filename} does not exist.`);
            return false;
        }

        // email exists?
        const emailExists = checkIfEmailExists(filename, email);
        if (!emailExists){
            console.log(`Email does not exist in ${filename}`);
            return false;
        }

        //password empty?
        if (!password || password.trim() === '') {
            console.log('Password is empty.');
            return false;
        }

        // Check password strength
        if (!checkPasswordStrength(password)) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('An error occurred:', error);
        return false;
    }
}

if (require.main === module) {
    const filename = '../auth/password.txt';
    const email = 'example@example.com';
    const password = 'password1234';
    validateCredentials(filename, email, password);
}

module.exports = { validateCredentials };
