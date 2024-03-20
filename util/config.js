// util/config.js
//**For some reason the process.env.MONGO_URI is not properly connecting to the DB and using the connection string
//inside the mongoose.connect is the only solution at the moment
//unable to resolve so far, but looking for solutions

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const util = require('../util/utility')
const {hash, writeFile} = require("./utility");
const User = require("../models/user");
const {disconnect} = require("mongoose");
dotenv.config();
const connectionString = process.env.MONGO_URI


const connectToDatabase = async () => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};



module.exports = connectToDatabase;
