const mongoose = require('mongoose') 
const { Schema } = mongoose;

const userschema = new Schema({
 name:
 {
    type:String
 },
 email:
 {
    type:String

 },
 password:
 {
    type:String

 }
});
const User = mongoose.model('user', userschema);

// Export the model
module.exports = User;

// Create indexes if needed (outside this module)
User.createIndexes();