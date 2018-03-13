import React, { Component } from 'react';
import logo from './logo.svg';
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  authenticate() {
    let base64 = require('base-64');
    const AUTHORIZATION_FAILED = 401;
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));
    headers.append('X-Requested-With', 'XMLHttpRequest');

    fetch("http://localhost:8080/authenticate", { headers: headers, method : 'post' })
      .then((response) => {
        if(response.status !== 200)
          alert("login failed!");
        else
          alert("yiha - welcome to the jungle");
      }).catch((err) => {
        console.log(err);
    });
  }
  
  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WODDS Tipp-Spiel</h1>
        </header>
        <h3>Login</h3>
        <input name="username" type="text" onChange={this.handleInputChange}/><br />
        <input name="password" type="password" onChange={this.handleInputChange}/><br />
        <button className="square" onClick={() => this.authenticate()}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
