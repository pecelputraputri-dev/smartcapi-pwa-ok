const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  enumeratorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  respondent: { type: Object },
  answers: { type: Object },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Interview', InterviewSchema);