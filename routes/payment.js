const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const  Payment  = require("../schema/payment.schema");
const router = express.Router();

// Add Payment Method
router.post("/addpaymentdetails", authMiddleware, async (req, res) => {
    const { cardNumber, cvc, expirationDate, nameOnCard } = req.body;

    const payment = new Payment({
        user: req.user,
        cardNumber,
        cvc,
        expirationDate,
        nameOnCard,
    });

    await payment.save();
    res.status(201).json({ message: "Payment method added successfully" });
});

// Get All Payment Methods for a User
router.get("/paymentmethod", authMiddleware, async (req, res) => {
    const payments = await Payment.find({ user: req.user }).select("-cvc");
    res.status(200).json(payments);
});

module.exports = router;
