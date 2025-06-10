const mongoose = require('mongoose');
const mongourl= ('mongodb://localhost:27017/wwe');
//connection to mongodb
const connectToMongo= async ()=>
{
    await mongoose.connect(mongourl)
    console.log("connected to MongoDB")
}

module.exports = connectToMongo;