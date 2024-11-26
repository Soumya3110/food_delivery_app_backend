const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const  User  = require("../schema/user.schema");
const authMiddleware = require("../middleware/authMiddleware");

const dotenv = require("dotenv");
dotenv.config();

// Register a user
router.post("/register", async (req, res) => {
    const { name, email, password, mobile } = req.body;

    // Check if the user already exists
    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8); // Hash the password
    const user = new User({ name, email, password: hashedPassword, mobile });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
});

// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Wrong email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Wrong email or password" });
    }
    const payload = { id: user._id };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
})

// Get user profile (Protected Route)
router.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user).select("name email gender country");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

// Edit user profile (Protected Route)
router.put("/editprofile", authMiddleware, async (req, res) => {
    const { name, email, gender, country } = req.body;
    const user = await User.findById(req.user);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.country = country || user.country;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
});

module.exports = router;
