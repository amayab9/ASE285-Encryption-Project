const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectionString = process.env.MONGO_URI


const connectToDatabase = async () => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        //use connection string when .env decides to not work
        //await mongoose.connect("mongodb+srv://bryanta21:<password>@cluster0.qdvgn0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        await mongoose.connect(connectionString);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};



module.exports = connectToDatabase;
