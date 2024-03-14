'use strict'
require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const {readFile, writeFile, hash} = require('../util/utility')

const mongoURI = process.env.URI;

function makepassword(passwordFileName, passwordEncFileName) {
   //read passwords from file
   const passwords = readFile('../password.txt')
   //hash passwords
   //connect to mongodb
   //insert hashed password
   //disconnect monog
}

if (require.main === module) {
    makepassword('./password.txt', './password.enc.txt')
}

module.exports = {makepassword};