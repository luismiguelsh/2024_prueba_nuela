const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  course: { type: String, required: true },
  group: { type: String, required: true },
  lectureHours: { type: Number, required: true },
  complementaryHours: { type: Number, required: true },
  regularSpace: { type: String, required: true }
});

module.exports = mongoose.model('Subject', subjectSchema);