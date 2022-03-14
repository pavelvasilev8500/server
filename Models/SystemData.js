const mongoose = require("mongoose")
const { Schema } = mongoose;
const SystemData = new Schema({
	_id: { type: String },
	Shutdown: { type: Boolean },
	Reset: { type: Boolean },
	Sleep: { type: Boolean },
},
{
	versionKey: false,
	collection: 'SystemData'
},
);
module.exports = mongoose.model('SystemData', SystemData);