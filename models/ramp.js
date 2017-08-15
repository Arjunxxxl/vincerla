var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String
	},
  matchid:{
    type:Number
  },
  dotaid:{
    type:Number
  }
});

var User = module.exports = mongoose.model('Ramp', UserSchema);

module.exports.createUser = function(newUser, callback){
	        newUser.save(callback);
	}
