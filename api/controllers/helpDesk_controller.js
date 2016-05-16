var Request = require('../models/HelpDesk.js');
var mongoose = require('mongoose');

module.exports = {
	findAll: function(req, res, next) {
		Request
		.find({})
		.exec(function(err, result) {
			if(err) return next(err);
			res.status(200).json(result);
		});
	},

	findOne: function(req, res, next) {
		Request
		.findById(req.params.id)
		.populate('Request')
		.exec(function(err, result) {
				if(err) return next(err);
				res.status(200).json(result);
		});

	},

	create: function(req, res, next) {
		Request
		.create(req.body, function(err, result) {
			if(err) return next(err);
			res.status(200).json(result);
		});

	},

	update: function(req, res, next) {
		Request.findOneAndUpdate(
			{ _id: mongoose.Types.ObjectId(req.params.id) },
			req.body,
			{ new: true },
			function(err, result){
				if(err) return next(err);
				res.status(200).json(result);
			}
		);

	},

	destroy: function(req, res, next) {
		Request.findByIdAndRemove(req.params.id, function(err, result){
				if(err) return next(err);
				res.status(200).json(result);
			});
		}
	}