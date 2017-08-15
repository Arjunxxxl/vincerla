var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	mobile: {
		type: Number,
		index:true
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
  tradeurl:{
    type:String
  },
  dotaid:{
    type:Number
  }
});

var User = module.exports = mongoose.model('Major_giveaway', UserSchema);

module.exports.createUser = function(newUser, callback){
	        newUser.save(callback);
	}
