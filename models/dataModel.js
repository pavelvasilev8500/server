const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataModel = new Schema({
  IDdata: { type: String },
  date: { type: String },
  time: { type: String },
  day: { type: String },
  worktime: { type: String },
  batary: { type: String },
});

module.exports = mongoose.model('Data', dataModel);
