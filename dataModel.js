const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataModel = new Schema({
  time: {type:String},
  day: {type:String}
});

module.exports = mongoose.model('Data', dataModel);
