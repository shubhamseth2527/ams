var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	name:{
        type:String,
        required:'You must enter a name',
        trim:true
    },
	attendance:[{

		date:{
			 type:Date,
			 default:Date.now,
		 },
		 entry:{type:Date},
		 exit:{
			 time:{
				 type:Date
			 },
			 // 1 - General
			 // 2 - Vacation
			 // 3 - Doctor
			 reason:Number
		 }
 
	}],
});


userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);