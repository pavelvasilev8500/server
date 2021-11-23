const mongoose = require('mongoose');

const { Schema } = mongoose;

const controlModel = new Schema({
  ID: { type: String },
  sleepContol: { type: Boolean },
  powerControl: { type: Boolean },
  rebootControl: { type: Boolean },
  blockControl: { type: Boolean },
});

module.exports = mongoose.model('controlModel', controlModel);
