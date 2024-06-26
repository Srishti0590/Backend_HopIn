const mongoose = require("mongoose");
const BookingModel = mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    amount: {
        type: Number,
    },
});
module.exports = mongoose.model("Bookings", BookingModel);