const express = require("express");
const  Cart  = require("../schema/cart.schema");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Add Item to Cart (Protected Route)
router.post("/addcart", authMiddleware, async (req, res) => {
    const { items, totalAmount } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({
                user: req.user,
                items,
                totalAmount,
            });
        } else {
            // Update existing cart
            cart.items.push(...items);
            cart.totalAmount += totalAmount;
        }

        await cart.save();
        res.status(201).json({ message: "Item(s) added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
});

// Get Cart for User (Protected Route)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
});

// Delete Item from Cart by itemId (Protected Route)
router.delete("/remove/:itemId", authMiddleware, async (req, res) => {
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.user });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the item in the cart
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Remove the item and update the total amount
        const removedItem = cart.items.splice(itemIndex, 1);
        cart.totalAmount -= removedItem[0].cost * removedItem[0].quantity;

        await cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
    }
});

module.exports = router;
