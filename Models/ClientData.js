const mongoose = require('mongoose');
const { Schema } = mongoose;
const ClientData = new Schema({
	_id: { type: String },
	Date: { type: String },
	Time: { type: String },
	Day: { type: String },
	Worktime: { type: String },
	Batary: { type: String },
	CpuTemperature: { type: String },
	GpuTemperature: { type: String },
},
{
	versionKey: false,
	collection: 'ClientData'
},
);
module.exports = mongoose.model('ClientData', ClientData);