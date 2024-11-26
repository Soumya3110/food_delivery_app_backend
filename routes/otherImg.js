const express = require("express");
const  Image  = require("../schema/otherImg.schema"); // Adjust path as needed
const router = express.Router();

// Add Image Metadata
router.post("/addimg", async (req, res) => {
    const { name, url } = req.body;
    try {
        const image = new Image({ name, url });
        await image.save();
        res.status(201).json({ message: "Image added successfully", image });
    } catch (error) {
        res.status(500).json({ message: "Error saving image", error });
    }
});

// Get All Images
router.get("/", async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images", error });
    }
});

// Get a Single Image by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ message: "Image not found." });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: "Error fetching image", error });
    }
});


module.exports = router;
