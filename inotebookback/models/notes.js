const mongoose = require('mongoose') 
const { Schema } = mongoose;

const notesschema = new Schema({
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref : "user",
  },
 title:
 {
    type:String
 },
 description:
 {
    type:String

 },
 tag:
 {
    type:String

 }
});
const Note = mongoose.model('Note', notesschema);

// Export the model
module.exports = Note;

// Create indexes if needed (outside this module)
