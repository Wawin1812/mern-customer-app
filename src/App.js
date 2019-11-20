import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CustomerList from './component/customer-list-component';
import EditList from './component/edit-list-component';
import CreateList from './component/create-list-component';

class App extends Component {
  render(){
  return (
    <Router>
    <div className='container'>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/" className="navbar-brand">MERN-Stack App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Customer Data</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create</Link>
                </li>
              </ul>
            </div>
          </nav>
      <Route path='/' exact component={CustomerList}/>
    <Route path='/edit/:id' component={EditList}/>
    <Route path='/create' component={CreateList}/>
    </div>
 
    </Router>
    
  );
}
}
export default App;
