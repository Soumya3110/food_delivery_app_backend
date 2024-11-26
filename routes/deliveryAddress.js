const express = require("express");
const  DeliveryAddress  = require("../schema/deliveryAddress.schema");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Add Delivery Address
router.post("/adddeliveryaddress", authMiddleware, async (req, res) => {
    const { state, city, pincode, phoneNumber, fullAddress } = req.body;

    const address = new DeliveryAddress({
        user: req.user,
        state,
        city,
        pincode,
        phoneNumber,
        fullAddress,
    });

    await address.save();
    res.status(201).json({ message: "Delivery address added successfully" });
});

// Get Delivery Addresses for User
router.get("/", authMiddleware, async (req, res) => {
    const addresses = await DeliveryAddress.find({ user: req.user });
    res.status(200).json(addresses);
});

module.exports = router;
