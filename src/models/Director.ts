import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({

    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    bio: String,
    createdAt:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("director", DirectorSchema);
