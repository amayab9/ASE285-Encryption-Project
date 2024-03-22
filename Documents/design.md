## DESIGN of PASLOCK

#### Architecture Overview
PasLock's system consists of several components such as handling user input, validating credentials,
encrypting passwords, and interacting with a database. Below is an overview on what each part is
responsible for.
1. Handling User Input: Upon receiving input from the user (node ./passwordjs.js <filename> <email address> <password>), it will then validate this input format.
2. Password Validation: Once a password is received, the system checks if the email exists in the password file. If it exists and fits the criteria, it moves to password encryption.
3. Password Encryption: After the password is validated, the system will encrypt the password by using a hashing algorithm. This is then stored in the database and in a password encryption file.
4. Database Interaction: The system interacts with MongoDB (database) and Mongoose (Object Data Modeling) library and stores the user information securely.
5. File I/O: The system reads and writes to files. It handles the password file and encrypted password file to ensure that passwords are securely stored.

#### Interaction
Below are the ways the components interact with one another.
1. Handling User Input -> Password Validation: User input is passes to the password validator to check the email format aligns with the (unencrypted)password file.
2. Password Validation -> Password Encryption: Following the step above, a valid password initiates the password encryption process.
3. Password Encryption -> Database Interaction: Once the password is encrypted, the system stores the email and encrypted password in the database.
4. Database Interaction -> File I/O: Finally, the encrypted password stored in the database is then written into a file called `password.enc.txt` that stores both the email and the encrypted password.