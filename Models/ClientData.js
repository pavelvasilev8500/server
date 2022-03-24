const mongoose = require('mongoose');
const { Schema } = mongoose;
const ClientData = new Schema({
	_id: { type: String },
    DateNumber: { type: String },
    DateMonth: { type: String },
    DateYear: { type: String },
    Time: { type: String },
    Day: { type: String },
    WorktimeDay: { type: String },
    WorktimeHour: { type: String },
    WorktimeMinut: { type: String },
    WorktimeSecond: { type: String },
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