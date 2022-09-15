import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Config = new Schema({
    envoirment: {
        type: String
    },
    config: {
        type: Object
    }
});

export default mongoose.model('Config', Config, 'config');