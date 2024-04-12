const mongoose = require('mongoose');
const connectToDatabase = require('../util/config');

async function clearDatabase() {
    try {
        await connectToDatabase();
        const User = require('../models/User');
        await User.deleteMany({});
        console.log('Database cleared.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

clearDatabase();
