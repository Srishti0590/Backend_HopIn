const mongoose = require("mongoose");
const Customer = new mongoose.Schema({
    fn:{type: String, required:true},

    ln:{type: String, required: true},

    age:{type: String, required: true},

    password:{type: String, required: true},

    phone:{type: Number, required: true},

    email:{type: String, required:true},

    picture:{type: String},

    userType:{type: String},
    
    isAdmin:{type: Boolean,required: true,default: false}
})
module.exports = mongoose.model('Customer', Customer);