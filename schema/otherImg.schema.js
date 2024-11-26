const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const otherimgSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }, // Image URL
});

module.exports = mongoose.model("OtherImg", otherimgSchema);
