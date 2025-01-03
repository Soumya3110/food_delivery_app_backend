const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  foldername: { type: String, required: true, unique: true, trim: true,    },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
  creationDate: {
    type: Date,
    default: Date.now
},
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDeatils' }], 
});

module.exports = mongoose.model('Folder', FolderSchema);
