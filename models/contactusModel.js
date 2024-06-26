const mongoose = require("mongoose");
const ContactUs = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true

    }
   
})
module.exports = mongoose.model('ContactUs', ContactUs);