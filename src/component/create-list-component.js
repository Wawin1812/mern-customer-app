//Creating the customer record with certain feilds with name and email as a mandatory

import React, { Component } from "react";
import axios from "axios";

export default class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: "",
      customer_dob: "",
      customer_phone_number: "",
      customer_email: ""
    };
  }

  onChangeCustomerName = e => {
    this.setState({
      customer_name: e.target.value
    });
  };

  onChangeCustomerDob = e => {
    this.setState({
      customer_dob: e.target.value
    });
  };

  onChangeCustomerPhone = e => {
    this.setState({
      customer_phone_number: e.target.value
    });
  };

  onChangeCustomerEmail = e => {
    this.setState({
      customer_email: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Customer Name: ${this.state.customer_name}`);
    console.log(`Customer DOB: ${this.state.customer_dob}`);
    console.log(`Customer Phone Number: ${this.state.customer_phone_number}`);
    console.log(`Customer Email Id: ${this.state.customer_email}`);

    const newCustomer = {
      customer_name: this.state.customer_name,
      customer_dob: this.state.customer_dob,
      customer_phone_number: this.state.customer_phone_number,
      customer_email: this.state.customer_email
    };

    axios
      .post("http://localhost:4000/customers/add", newCustomer)
      .then(res => console.log(res.data));

    this.setState({
      customer_name: "",
      customer_dob: "",
      customer_phone_number: "",
      customer_email: ""
    });
  };
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Customer</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.customer_name}
              onChange={this.onChangeCustomerName}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth: </label>
            <input
              type="date"
              className="form-control"
              value={this.state.customer_dob}
              onChange={this.onChangeCustomerDob}
            />
          </div>
          <div className="form-group">
            <label>Phone Number: </label>
            <input
              type="tel"
              className="form-control"
              value={this.state.customer_phone_number}
              onChange={this.onChangeCustomerPhone}
            />
          </div>
          <div className="form-group">
            <label>Email ID: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.customer_email}
              onChange={this.onChangeCustomerEmail}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create List"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
