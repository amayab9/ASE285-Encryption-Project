'use strict';

const { readFile, writeFile, hash } = require('../util/utility.js');
const connectToDatabase = require('../util/config');
const User = require("../models/User");
const { disconnect } = require("mongoose");
const fs = require('fs');

async function makepassword(passwordFileName, passwordEncFileName) {
    try {
        await connectToDatabase();
        const passwords = readFile(passwordFileName);
        const encryptedPasswords = [];

        for (const line of passwords) {
            try {
                const [email, password] = line.split(':');
                if (!email || !password) {
                    continue;
                }
                const trimmedEmail = email.trim();
                const hashedPassword = hash(password.trim());
                const existingUser = await User.findOne({ email: trimmedEmail });

                if (existingUser) {
                    console.log(`User email ${trimmedEmail} already exists, skipping..`);
                    continue;
                }

                await User.create({ email: trimmedEmail, hashedPassword: hashedPassword });

                const encryptedPassword = `${trimmedEmail}:${hashedPassword}`;
                encryptedPasswords.push(encryptedPassword);
            } catch (error) {
                console.error(`Error processing line: ${line}`, error);
            }
        }

        fs.writeFileSync(passwordEncFileName, encryptedPasswords.join('\n'))
        await disconnect();
        console.log('Encrypted passwords saved');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

if (require.main === module) {
    makepassword('../auth/password.txt', '../auth/password.enc.txt');
}

module.exports = { makepassword };
