const express = require('express');
const Folder = require('../schema/folder.schema');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();


router.get('/', authMiddleware,  async (req, res) => {

});

router.post('/create', authMiddleware, async (req, res) => {
  console.log("Request body:", req.body);
  
  const { foldername } = req.body;

  if (!foldername || !foldername.trim()) {
    return res.status(400).json({ message: "Folder name is required." });
  }

  try {
    const folder = new Folder({
      foldername: foldername.trim(),
      user: req.user.userid, 
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    console.error("Error while creating folder:", error);
    res.status(500).json({ message: "Server error. Please try again later.", error });
  }
});



module.exports = router;
