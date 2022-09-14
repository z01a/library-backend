import mongoose from "mongoose";

const Schema = mongoose.Schema;

let History = new Schema({
    username: {
        type: String
    },
    isbn: {
        type: String
    },
    taken: {
        type: Date,
    },
    returned: {
        type: Date,
    }
});

export default mongoose.model('History', History, 'history');