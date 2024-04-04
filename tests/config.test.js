'use strict';

require('dotenv').config();
const connectToDatabase = require('../util/config');
const mongoose = require('mongoose');

describe('connectToDatabase function', () => {
    const URI = process.env.MONGO_URI;

    test('should connect to MongoDB using the actual URI', async () => {
        await connectToDatabase();
        expect(mongoose.connection.readyState).toEqual(1);
    });
});
