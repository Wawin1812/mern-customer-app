//Buiding a model Schema for the database

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Customer = new Schema({
  customer_name: {
    type: String
  },
  customer_dob: {
    type: Date
  },
  customer_phone_number: {
    type: Number
  },
  customer_email: {
    type: String
  }
});

module.exports = mongoose.model("Customer", Customer);
