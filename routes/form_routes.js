const express = require('express');
const Form = require('../schema/form.schema');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

// Get all forms 
router.get('/', authMiddleware, async (req, res) => {

});

// Create a new form
router.post('/create', authMiddleware, async (req, res) => {
  const { filename, fields } = req.body;

  if (!filename || !fields || fields.length === 0) {
    return res.status(400).json({ message: 'Filename and fields are required' });
  }

  try {
    const form = new Form({
      filename,
      user: req.user.id,
      fields,
    });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Track Form Activity
router.post('/track/:formId', async (req, res) => {

});

module.exports = router;
