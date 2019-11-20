const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const customerRoutes = express.Router();
const PORT = 4000;

let Customer = require("./customer.data");

app.use(cors());
app.use(bodyParser.json());

//esatblishing connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/customers", {
  useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// get a database from the mongodb
customerRoutes.route("/").get(function(req, res) {
  Customer.find(function(err, Customers) {
    if (err) {
      console.log(err);
    } else {
      res.json(Customers);
    }
  });
});

// fetch a specific database using Id
customerRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Customer.findById(id, function(err, customer) {
    res.json(customer);
  });
});

// Delete a record
customerRoutes.route("/:id").delete(function(req, res) {
  let id = req.params.id;
  Customer.findByIdAndDelete(id, function(err, customer) {
    res.json(customer);
  });
});

// Adding a record to the DB
customerRoutes.route("/add").post(function(req, res) {
  let customer = new Customer(req.body);
  customer
    .save()
    .then(customer => {
      res.status(200).json({ customer: "Customer added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new Customer failed");
    });
});
// Editing the record with specific id
customerRoutes.route("/update/:id").post(function(req, res) {
  Customer.findById(req.params.id, function(err, customer) {
    if (!customer) res.status(404).send("data is not found");
    else customer.customer_name = req.body.customer_name;
    customer.customer_dob = req.body.customer_dob;
    customer.customer_phone_number = req.body.customer_phone_number;
    customer.customer_email = req.body.customer_email;

    customer
      .save()
      .then(customer => {
        res.json("Customer updated");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

app.use("/Customers", customerRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
