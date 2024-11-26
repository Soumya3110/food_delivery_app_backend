const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    }, // Reviewer name
    location: {
        type: String,
        required: true
    }, // Location of the reviewer
    comment: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }, // 1 to 5 star rating
    dateTime: {
        type: Date,
        default: Date.now
    }, // Timestamp
});

module.exports = mongoose.model("Review", reviewSchema);
