import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Reading = new Schema({
    username: {
        type: String
    },
    isbn: {
        type: String
    },
    taken: {
        type: Date,
    }
});

export default mongoose.model('Reading', Reading, 'reading');