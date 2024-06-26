const express = require ("express");
const cors= require("cors");

const app = express();

app.use(express.json());
app.use(express.static(__dirname+ '/uploads'));
app.use(cors());

require("./connection/connection");
const customerRoute = require("./routers/customerRoute");
app.use(customerRoute);
const vehicleRoute = require("./routers/vehicleRoute");
app.use(vehicleRoute);
const contactusRoute= require("./routers/contactusRoute");
app.use(contactusRoute);
const bookingRoute= require("./routers/bookingRoute");
app.use(bookingRoute);

//connectDB();

//app.use("/public/uploads", express.static(path.join(__dirname, "/public/uploads")));







app.listen(90);