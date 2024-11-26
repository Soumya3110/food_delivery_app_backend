const express = require("express");
const  Review  = require("../schema/review.schema");
const router = express.Router();

// Add Review
router.post("/addreview", async (req, res) => {
    try {
        const { name, location, comment, rating } = req.body;


        const review = new Review({
            name,
            location,
            comment,
            rating,
        });

        await review.save();
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
});

// Get Reviews for a Restaurant
router.get("/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const reviews = await Review.find({ restaurant: restaurantId });
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this restaurant" });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
});

module.exports = router;
