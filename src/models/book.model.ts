import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
    isbn: {
        type: String,
        unique: true
    },
    title:{
        type: String
    },
    authors: {
        type: Array<String>,
    },
    genres:{
        type: Array<String>
    },
    publisher:{
        type: String,
    },
    published:{
        type: String
    },
    language:{
        type: String
    },
    cover:{
        type: String
    },
    active: {
        type: Boolean
    },
    count: {
        type: Number
    }
});

export default mongoose.model('Book', Book, 'books');