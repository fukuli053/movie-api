import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 5,
    },
    email: {
        type: String
    },
    createdAt : {
        type: Date,
        default : Date.now
    }
});


module.exports = mongoose.model("user", UserSchema);