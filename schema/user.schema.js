const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: {
    type: Date,
    default: Date.now
},
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' }], 
});



module.exports = mongoose.model('UserDetails', UserSchema);
