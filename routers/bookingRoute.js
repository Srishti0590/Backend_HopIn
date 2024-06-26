const express = require("express");
const MakeBooking = require("../models/bookingModel");
const router = new express.Router();
const auth = require("../auth/auth");

//Make booking
router.post("/booking/insert", auth.customerGuard, (req, res) => {
  const data = MakeBooking({
    pid: req.body.pid,
    userid: req.customerData._id,
    amount: req.body.amount,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        msg: "The car was booked successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});


router.get("/bookings/get", auth.customerGuard, (req, res) => {
    MakeBooking.find({ userid: req.customerData._id })
    .populate("pid")
    .then((cart) => {
      if (cart != null) {
        res.status(201).json({
          success: true,
          data: cart,
        });
      }
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});
//Cart Delete
router.delete("/bookings/delete/:booking_id", auth.customerGuard, (req, res) => {
  console.log(req.params.booking_id);
  MakeBooking.deleteOne({ _id: req.params.booking_id })
    .then(() => {
      res.json({ msg: "Booking is cancelled successfully", success: true });
    })
    .catch((e) => {
      res.json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});
module.exports = router;