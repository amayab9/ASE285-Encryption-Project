const { readFile, hash } = require('../util/utility.js');

async function validateCredentials(passwordFileName, email, password) {
    try {
        if (!password) {
            return false;
        }

        const lines = readFile(passwordFileName);
        for (const line of lines) {
            const [storedEmail, storedPassword] = line.split(':');
            if (storedEmail.trim() === email.trim() && storedPassword.trim() === password.trim()) {
                return true; // Valid credentials
            }
        }
        return false; // Not matching credentials
    } catch (error) {
        console.error('Error validating credentials:', error);
        return false;
    }
}


module.exports = { validateCredentials };
