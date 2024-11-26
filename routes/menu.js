const express = require("express");
const  Menu  = require("../schema/menu.schema");
const router = express.Router();

// Add Menu Category
router.post("/addmenu", async (req, res) => {
    const { name, items } = req.body;

    const category = new Menu({ name, items });
    await category.save();

    res.status(201).json({ message: "Menu category added successfully" });
});

// Get Menu Categories by Restaurant
router.get("/:restaurantId", async (req, res) => {
    const { restaurantId } = req.params;
    const categories = await Menu.find({ restaurant: restaurantId });
    res.status(200).json(categories);
});

module.exports = router;
