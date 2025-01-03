const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserDetails = require('../schema/user.schema');
const dotenv = require("dotenv");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
dotenv.config();


router.post("/register", async (req, res) => {
 

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = await UserDetails.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserDetails({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await UserDetails.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Wrong email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Wrong email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get('/username', authMiddleware, async (req, res) => {
  try {

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await UserDetails.findById(userId);


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, username: user.username });
  } catch (error) {
    console.error("Error fetching username:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




  

router.put("/settings", async (req, res) => {
  const { name, email, oldPassword, newPassword } = req.body;

  try {
  
    const user = await UserDetails.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    if (oldPassword && newPassword) {
     
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "password is incorrect" });
      }


      if (oldPassword === newPassword) {
        return res
          .status(400)
          .json({ message: "New password cannot be the same as the old password" });
      }


      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }


    user.name = name || user.name;
    user.email = email || user.email;


    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
