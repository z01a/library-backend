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
        type: String
    },
    password:{
        type: String
    },
    address:{
        type: String
    },
    email:{
        type: String
    },
    picture:{
        type: String
    }
});

export default mongoose.model('User', User, 'users');