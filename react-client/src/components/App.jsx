import React from 'react';
import Home from './Home.jsx';
import axios from 'axios';
import Signup from '../subcomponents/signup.jsx'
import Login from '../subcomponents/login.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      uid:'',
      showSignup: false,
      showLogin: false
    }
//bindings
this.showSignUp = this.showSignUp.bind(this);
this.showLogin = this.showLogin.bind(this);
this.signupCallback = this.signupCallback.bind(this);
this.loginCallback = this.loginCallback.bind(this);
  }

//functions
showSignUp() {
  this.setState({showSignup: true})
}

showLogin() {
  this.setState({showLogin: true})
}

signupCallback(name) {
  this.setState({
    username: name,
    isLoggedIn: true,
    showSignup: false
  })
}

loginCallback(name) {
  this.setState({
    username: name,
    isLoggedIn: true,
    showLogin: false
  })
}

  render() {
    return (
      <div>

        {this.state.isLoggedIn ? '' :
        <div className="signupForm" style={rightStyle}>
          <button onClick={this.showSignUp}>Sign up</button>
          <button onClick={this.showLogin}>Log in</button>
        </div> }

        {this.state.showSignup ?
          <Signup cb={this.signupCallback} style={rightStyle}/> : ''
        }

        {this.state.showLogin ?
          <Login cb={this.loginCallback} style={rightStyle}/> : ''
        }

        {this.state.username !== '' ?
          <div style={rightStyle}>
            <div classID='usernameDisplay'> Hi, {this.state.username}</div>
            <button>Submit your graphics here!</button>
          </div>
            : ''
        }


        <div classID="home">
          <Home/>
        </div>
      </div>
    )
  }

};

const rightStyle = {
  float: "right"
}

export default App;
