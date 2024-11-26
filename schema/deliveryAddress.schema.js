const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deliveryAddressSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("DeliveryAddress", deliveryAddressSchema);
