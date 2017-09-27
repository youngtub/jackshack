import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    //bindings
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  };

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  };

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  };

  submit() {
    axios.post('/api/signup', {
      name: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
    .then( (res) => {
      console.log(res);
      this.props.cb(this.state.username)
    });
  }

render() {
  return (
    <div classID='signupForm' style={rightStyle}>
      <br></br><br></br>
      <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}></input><br></br>
      <input type="text" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}></input><br></br>
      <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange}></input><br></br>
      <button onClick={this.submit}>Create Account</button>
    </div>
  )
}

};

const rightStyle = {
  float: "right"
}

export default Signup;
