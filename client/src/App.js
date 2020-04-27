import React from 'react';
import axios from "axios";
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "test",
      password: "test"
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = () => {
    axios("http://localhost:9000/users/login", {
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(result => {
      localStorage.setItem("token", result.data.token)
      console.log(result.data)
    })
    .catch(error => console.error(error))
  }

  requestData = () => {
    axios("http://localhost:9000/users/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(result => console.log(result.data))
    .catch(error => console.error(error))
  }

  render() {
    return(
    <div className="App">
      <div className="container">
        <h1>Login</h1>
        <input value={this.state.username} onChange={this.handleChange} name="username" type="text" className="form-control" />
        <input value={this.state.password} onChange={this.handleChange} name="password" type="password" className="form-control" />
        <button onClick={this.login}>LOGIN</button>

        
        <button onClick={this.requestData}>Request protected data</button>
      </div>
    </div>
    )
  }
}

export default App;
