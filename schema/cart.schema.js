const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu.items.itemName",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            cost: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu.items.cost",
                required: true
            },
            totalCost: {
                type: Number,
                required: true
            }, // quantity * cost
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Cart", cartSchema);
