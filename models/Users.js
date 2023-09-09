const mongoose = require('mongoose')

const Schema = mongoose.Schema ;
const userSchema = new Schema({
       Name:{
        type:String
       },
       Email:{
        type:String
       },
       Password:{
        type:String
       },
       comment:[{
              type:mongoose.Types.ObjectId,           
              ref:'Comment'                           
       }],
       post:[{
              type:mongoose.Types.ObjectId,           
              ref:'Post'                           
       }],

})

const  User = mongoose.model('user', userSchema)
module.exports = User