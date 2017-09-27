import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    //bindings
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

  submit() {
    axios.post('/api/login', {
      name: this.state.username,
      password: this.state.password,
    })
    .then( (res) => {
      this.props.cb(this.state.username, res.data)
    });
  }

render() {
  return (
    <div classID='signupForm' style={rightStyle}>
      <br></br><br></br>
      <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}></input><br></br>
      <input type="text" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
      <button onClick={this.submit}>Log in</button>
    </div>
  )
}

};

const rightStyle = {
  float: "right"
}

export default Signup;
