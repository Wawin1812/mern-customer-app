//Editing the customer record upon clicking on the specific record

import React, { Component } from "react";
import axios from "axios";

export default class EditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: "",
      customer_dob: "",
      customer_phone_number: "",
      customer_email: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost4000/customers/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          customer_name: response.data.customer_name,
          customer_dob: response.data.customer_dob,
          customer_phone_number: response.data.customer_phone_number,
          customer_email: response.data.customer_email
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
    const obj = {
      customer_name: this.state.customer_name,
      customer_dob: this.state.customer_dob,
      customer_phone_number: this.state.customer_phone_number,
      customer_email: this.state.customer_email
    };
    axios
      .post(
        "http://localhost:4000/customers/update/" + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h3>Update Customer</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name : </label>
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
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.customer_email}
              onChange={this.onChangeCustomerEmail}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Update Customer"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
