const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ["male", "female", "other"]
    },
    country: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("User", userSchema);