import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Admin = new Schema({
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
    email:{
        type: String,
        unique: true
    },
    picture:{
        type: String
    }
});

export default mongoose.model('Admin', Admin, 'admins');