const mongoose = require("mongoose");
const Customer = require("../models/CustomerModel");
const Vehicle = require("../models/vehicleModel");
const url = "mongodb://127.0.0.1:27017/CarRental";
beforeAll(async () => {
await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,});
});
afterAll(async () => {
await mongoose.connection.close();
});
describe("Testing Customer schema", () => {
    //the code below is for insert testing
    it("Add user testing", () => {
      const customerData = {
        fn: "test",
        ln: "best",
        age: 21,
        phone: 4567,
        email: "test@gmail.com",
        password: "test",
        userId: "62c51a8f7f15c6e4db0cd782",
      };
      return Customer.create(customerData).then((Customer_ret) => {
        expect(Customer_ret.fn).toEqual("test");
      });
    });
    //testing if the update is working
    it("Updating the user testing", async () => {
      const status = await Customer.updateOne(
        { name: "test" },
        {
          name: "test2",
          phone: 45678,
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the user teting", async () => {
      const status = await Customer.findOneAndDelete({ name: "test2" });
      expect(status.ok);
    });
  });

  describe("Testing Vehicle schema", () => {
    //the code below is for insert testing
    it("Add Vehicle testing", () => {
      const vehicleData = {
        name: "hyundai",
        model: "c310",
        power: 2100,
        capacity: "4-6",
        colour: "Blue",
        vehicleId: "62c51a8f7f15c6e4db0cd782",
      };
      return Vehicle.create(vehicleData).then((Vehicle_ret) => {
        expect(Vehicle_ret.name).toEqual("hyundai");
      });
    });
    // //testing if the update is working
    it("Updating the vahicle testing", async () => {
      const status = await Vehicle.updateOne(
        { name: "hyundai" },
        {
          name: "hyundai1",
          
        }
      );
      expect(status.ok);
    });
    // delete testing;
    it("Deleting the vehicle teting", async () => {
      const status = await Vehicle.findOneAndDelete({ name: "hyundai1" });
      expect(status.ok);
    });
    //the below code is for update testing here
  });

