const mongoose = require("mongoose");
const Vehicle = new mongoose.Schema({
    name:{
        type: String
    },
    model:{
        type: String
    },
    capacity:{
        type: String
    },
    power: {
        type: String
    },
    colour:{
        type: String,
        // required: true
    },
    picture:{
        type: String,
        // required: true
    }
})
module.exports = mongoose.model('Vehicle', Vehicle);