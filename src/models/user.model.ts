import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname:{
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    moderator:{
        type: Boolean
    },
    address:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    phone:{
        type: String
    },
    picture:{
        type: String
    }
});

export default mongoose.model('User', User, 'users');