'use strict'
const fs = require('fs');
const util = require('../util/utility')
const {makepassword} = require("./makepassword");

function passwordjs() {
    if (process.argv.length != 5) return 'false';

    var filename = process.argv[2];
    var email = process.argv[3];
    var password = process.argv[4];
    console.log(`Filename: ${filename}, Email: ${email}, Password: ${password}`);

    /*if (!fs.existsSync(filename)) {
        throw `${filename} does not exist!`
    }*/
    try{
        //check that filename isn't blank
        if (filename !== undefined){ //also check if it is a real file
            //check if email and password is in password file, yes -> true, no -> false
            if (email !== undefined){
                //check if input has password
                if (password !== undefined || password === ' '){
                    //check weakness of password -> refactor for weakness
                    if (password.length >= 12){
                        //later implement more security for password
                        //if everything is right -> take the filename into makepassword(filename, 'password.enc.txt')
                        const startEncryptionProcess = makepassword(filename, '../auth/password.enc.txt')

                    } else {
                        console.log('Password is weak')
                        return false
                    }


                } else {
                    console.log('No password detected');
                    return false
                }

            } else {
                console.log('No email defined')
                return false
            }

        } else {
            console.log('No filename was entered');
            return false;
        }

    } catch (error){
        console.log(error);
    }

}

if (require.main === module) {
    console.log(passwordjs()) // print out true or false
}

module.exports = {passwordjs};