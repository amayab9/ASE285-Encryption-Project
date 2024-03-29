// util/config.js
//**For some reason the process.env.MONGO_URI is not properly connecting to the DB and using the connection string
//inside the mongoose.connect is the only solution at the moment
//unable to resolve so far, but looking for solutions

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectionString = process.env.MONGO_URI


const connectToDatabase = async () => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        await mongoose.connect("mongodb+srv://bryanta21:lf2Nfvc0HGLZM0Lz@cluster0.qdvgn0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        //await mongoose.connect(connectionString);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};



module.exports = connectToDatabase;
