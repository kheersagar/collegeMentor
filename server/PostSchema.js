const mongoose = require("mongoose");
const User = require("./user.js");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    image:String,
    timestamp:String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

})


const post = mongoose.model("Post", postSchema);

module.exports = post;