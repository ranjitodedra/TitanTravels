const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
firstname : {
    type : String,
    required :true
},
lastname : {
    type:String,
    required:true
},
email :{
    type:String,
    required:true,
    unique:true
},
createpassword:{
    type:String,
    required:true
},
confirmpassword:{
    type:String,
    required:true
},

}) 

//now we need to create a collections   

const Register = new mongoose.model("Register",userSchema);

module.exports = Register;