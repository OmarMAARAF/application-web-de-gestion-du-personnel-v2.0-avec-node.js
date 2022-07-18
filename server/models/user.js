const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =new mongoose.Schema({
    username: {type: String,required : true,unique :true},
    password : {type: String,required : true},
    email: {type: String,required : true,unique :true},
    usertype:{type:String,default:"user"}

},{
    collation : { locale: 'en_US', strength: 1 }
})

userSchema.plugin(uniqueValidator);


module.exports= mongoose.model('users',userSchema);