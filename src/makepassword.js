'use strict'

const { readFile, writeFile, hash } = require('../util/utility.js');
const connectToDatabase = require('../util/config')
const User = require("../models/User");
const {disconnect} = require("mongoose");

async function makepassword(passwordFileName, passwordEncFileName) {
    try {
        await connectToDatabase();
        const passwords = readFile(passwordFileName);
        const encryptedPasswords = [];

        for (const line of passwords) {
            const [email, password] = line.split(':');
            const trimmedEmail = email.trim();
            const hashedPassword = hash(password.trim());
            await User.create({ email: trimmedEmail, hashedPassword: hashedPassword });

            const encryptedPassword = `${email.trim()}:${hashedPassword}`;
            encryptedPasswords.push(encryptedPassword);
        }

        await disconnect();
        writeFile(encryptedPasswords, passwordEncFileName); // Moved writeFile inside try block
        console.log('Encrypted passwords saved');
    } catch (error) {
        console.log(error);
    }
}

//console.log('../auth/password.txt', '../auth/password.enc.txt');

if (require.main === module) {
    makepassword('../auth/password.txt', './password.enc.txt');
}

module.exports = { makepassword };
