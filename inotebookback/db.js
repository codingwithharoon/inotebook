const mongoose = require('mongoose');
const mongourl= ('mongodb://localhost:27017/wwe');
//connection
const connectToMongo= async ()=>
{
    await mongoose.connect(mongourl)
    console.log("connected to MongoDB")
}

module.exports = connectToMongo;