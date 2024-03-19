require('dotenv').config()
const mongoose = require('mongoose')
const databaseName = 'authentication'

beforeAll(async () =>{
    const url = process.env.URI
    await mongoose.connect(url, {useNewUrlParser: true})
})