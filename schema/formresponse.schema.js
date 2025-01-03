const mongoose = require('mongoose');

const FormResponseSchema = new mongoose.Schema(
  {
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserDetails',
      required: true,
    },
    response: [
      {
        elementType: { type: String, required: true }, 
        question: { type: String, required: true },
        answer: { type: mongoose.Schema.Types.Mixed }, 
        isValid: { type: Boolean, default: true },
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  },
);

module.exports = mongoose.model('FormResponse', FormResponseSchema);
