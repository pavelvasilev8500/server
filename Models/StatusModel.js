const mongoose = require('mongoose');
const { Schema } = mongoose;
const StatusData = new Schema({
	_id: { type: String },
	Status: { type: Boolean },
	PCType: { type: String }
},
	{
		versionKey: false,
		collection: 'StatusData'
	},
);
module.exports = mongoose.model('StatusData', StatusData);