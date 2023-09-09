const mongoose = require('mongoose')

const Schema = mongoose.Schema ;
const CommentSchema = new Schema ({
    body:{
        type:String,
        required: true
    },
    PostId:{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
      },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

const Comment = mongoose.model('Comment' , CommentSchema)
module.exports =  Comment;