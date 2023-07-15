const mongoose = require('mongoose')
require('dotenv').config()
const mongo_uri = process.env.URL

const conn = async () => {
    try{
        await mongoose.connect(mongo_uri)
        console.log('MongoDB connected....');
    }catch(e){
        console.log('Unable to connect to MongoDB', e);
    }
}


module.exports = conn