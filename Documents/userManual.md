## PASLOCK

### How to use
After downloading the source code, you will be able to run PasLock with a few commands.\
Command structure: `node ./src/passwordjs.js <password_file> <email> <password>`
- `node ./src/passwordjs.js`: default command to start the application using node
- `<password_file>`: Insert the path to your password file that contains the username and passwords separted with ':'
- `<email>`: Insert an email that is the password file
- `<password>`: Insert the password contained inside the password file or a new password

Example: `node ./passwordjs.js ../auth/password.txt thisismyemail23@email.com passwordWillBeEncrypted`

## How it works
Using the commands in the "How to use" section allows for you to create a hashed password.\
- The system checks if your email and password are in the provided password file.
- The system will then automatically enter the rest of the emails and passwords in the password file if there are any (For more info: documents/justification.md)
- Next, the password is hashed and sent to the database to be stored.
- The password file will be cleared to ensure no passwords are leaked after you run your command.
