//Displays the list of customer entered in the record

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Customer = props => (
  <tr>
    <td>{props.customer.customer_name}</td>
    <td>{props.customer.customer_dob}</td>
    <td>{props.customer.customer_phone_number}</td>
    <td>{props.customer.customer_email}</td>
    <td>
      <Link to={"/edit/" + props.customer._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteCustomer(props.customer._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);
export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/customers/")
      .then(response => {
        this.setState({ customers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/customers/")
      .then(response => {
        this.setState({ customers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteCustomer = id => {
    axios.delete("http://localhost:4000/customers/" + id).then(response => {
      console.log(response.data);
    });
    this.setState({
      customer: this.state.customers.filter(cl => cl._id !== id)
    });
  };

  CustomerList() {
    return this.state.customers.map(currentCustomer => {
      return (
        <Customer
          customer={currentCustomer}
          deleteCustomer={this.deleteCustomer}
          key={currentCustomer._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Customer List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{this.CustomerList()}</tbody>
        </table>
      </div>
    );
  }
}
