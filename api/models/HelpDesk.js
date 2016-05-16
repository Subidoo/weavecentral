var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	request: { type: String },
	description: { type: String },
	created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', schema);