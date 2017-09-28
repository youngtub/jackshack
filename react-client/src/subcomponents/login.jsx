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
      <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} style={formStyle}></input><br></br>
      <input type="text" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} style={formStyle}></input><br></br>
      <button onClick={this.submit} style={buttonStyle}>Log in</button>
    </div>
  )
}

};

const rightStyle = {
  float: "right"
}

const formStyle = {
  float: 'right',
  height: '1%',
  width: '150px',
  padding: "10px",
  border: "solid 1px #fff",
  boxShadow: "inset 1px 1px 2px 0 #707070",
  transition: "box-shadow 0.3s",
  fontFamily: 'verdana',
  fontSize: '16px'
}

const buttonStyle = {
  backgroundColor: '#305da5',
  color: 'white',
  width: '70px',
  padding: '5px',
  fontFamily: 'verdana',
  fontSize: '16px'
}

export default Signup;
