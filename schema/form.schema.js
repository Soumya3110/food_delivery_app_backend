const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDeatils', required: true }, 
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  bubbles: [
    {
      bubbleType: { type: String, enum: ['text', 'image', 'video', 'gif'], required: true }, 
      content: { type: String, required: true }, 
    },
  ],
  inputs: [
    {
      fieldType: { type: String, required: true },
      label: { type: String, required: true },
      placeholder: { type: String, default: '' }, 
      required: { type: Boolean, default: false }, 
      options: [String], 
    },
  ],
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDeatils' }], 
  viewCount: { type: Number, default: 0 }, 
  firstFieldEnteredCount: { type: Number, default: 0 }, 
  creationDate: {
    type: Date,
    default: Date.now
},
});

module.exports = mongoose.model('Form', FormSchema);
