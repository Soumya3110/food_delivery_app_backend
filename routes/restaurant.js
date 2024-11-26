const express = require("express");
const  Restaurant  = require("../schema/restaurant.schema");
const router = express.Router();

// Add Restaurant
router.post("/addrestaurants", async (req, res) => {
    const { name, image } = req.body;

    const restaurant = new Restaurant({ name, image });
    await restaurant.save();

    res.status(201).json({ message: "Restaurant added successfully" });
});

// Get All Restaurants
router.get("/", async (req, res) => {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
});

module.exports = router;
