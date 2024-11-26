const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    }, // e.g., "Pizza", "Beverages"
    items: [
        {
            itemName: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            cost: {
                type: Number,
                required: true
            },
            image: {
                type: String
            }, // URL for the item image
        }
    ]
});

module.exports = mongoose.model("Menu", menuSchema);
