const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
          required: true 
        },
    cardNumber: { 
        type: String, 
        required: true 
    },
    cvc: { 
        type: String, 
        required: true 
    },
    expirationDate: { 
        type: String, 
        required: true 
    },
    nameOnCard: {
         type: String,
          required: true 
        },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
