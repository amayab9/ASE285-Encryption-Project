# ASE285-Encryption-Project

---
# PassLock
PassLock is an application that encrypts passwords. We check that an email inside given file from user input 
and check that the password meets requirements. After the password passes verification, we then
encrypt it and store it inside the password.enc.txt file.

### Problem Domain
1. We are given a file password.txt with the users’ email addresses and
passwords. We need to make an encrypted file, password.enc.txt, and
upload the information into the MongoDB database using Mongoose.
2. We need to return true or false when users give email addresses and
   passwords.

### Tools used
* JavaScript
* Node.js
* MongoDB
* Mongoose
* Git/GitHub
* Canvas
* WebStorm IDE

---
### HW 8 / Individual Project

##### The Goal of the Project
"In this assignment, students are required to design and implement applications
using Node.js, WebStorm IDE, Mongoose, and Git/GitHub. They define requirements for the application; they specify modules with input, output, and
interfaces; they use WebStorm IDE to write, test, and debug their design; Finally,
they use Git/GitHub to upload all the artifacts, schedule, and documents.
This assignment is to assess each student’s capability to use software engineering
rules and tools to build an application that meets users’ requirements. Students translate the problem domain into requirements."

##### Software Architecture/Design and Diagrams\
"Software design documents should include the following:
* Software architecture diagram that shows (a) Form, (b) Modules, and
(c) Rationale.
∗ The input, output, and information flow should be explained
clearly.
* A module design with (a) its responsibility and (b) interfaces."

##### Unit Tests
Students should make unit tests for their modules. 1. They should test whether
their file reading and writing are working. 2. They should test whether their
conversion algorithm is working. 3. They should test whether their Mongoose
database is working.

##### Acceptance Tests
Students should make sure their program passes the acceptance test. 

##### Documents
Make a user manual so your clients can use the application.

##### Notes
- any old .env/mongo connection strings do not work, database was trashed after final commit/push (passwords changed after every push)
- justifications for the project is included in the Documentation folder
