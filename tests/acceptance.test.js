const { execSync } = require('child_process');

function executeCommand(command) {
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        return false;
    }
}

describe('Acceptance Tests', () => {
    test('valid login credentials = true', () => {
        expect(executeCommand('node ../src/passwordjs.js ../auth/password.enc.txt sm.cho@hello.com 123456')).toBe(true);
        expect(executeCommand('node ../src/passwordjs.js ../auth/password.enc.txt john.deacon@good.com bestpassword')).toBe(true);
        expect(executeCommand('node ../src/passwordjs.js ../auth/password.enc.txt alan.may@best.com mypassword')).toBe(true);
        expect(executeCommand('node ../src/passwordjs.js ../auth/password.enc.txt henry.taylor@edu.com educatorbest')).toBe(true);
    });
});
