const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        sparse:true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    interest: {
        type: String,
    },
    contact: {
        type: String,
    },
    about: {
        type: String,
    },
    dob:{
        type:String
    },
    course:{
        type:String
    },
    userSearch:{
        type:Array,
        default : []
    },
    postSearch:{
        type:Array,
        default : []
    }
})


const user = mongoose.model("user", userSchema);

module.exports = user;