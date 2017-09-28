import React from 'react';
import Home from './Home.jsx';
import axios from 'axios';
import Signup from '../subcomponents/signup.jsx'
import Login from '../subcomponents/login.jsx'
import SubmitGraphics from '../subcomponents/submitGraphics.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      uid:'',
      showSignup: false,
      showLogin: false,
      showSubmitGraphics: false
    }
//bindings
this.showSignUp = this.showSignUp.bind(this);
this.showLogin = this.showLogin.bind(this);
this.showSubmitGraphics = this.showSubmitGraphics.bind(this);

this.signupCallback = this.signupCallback.bind(this);
this.loginCallback = this.loginCallback.bind(this);
this.submitGraphicsCallback = this.submitGraphicsCallback.bind(this);
  }

//functions
showSignUp() {
  this.setState({showSignup: true})
}

showLogin() {
  this.setState({showLogin: true})
}

showSubmitGraphics() {
  this.setState({showSubmitGraphics: true})
}

signupCallback(name, id) {
  this.setState({
    username: name,
    isLoggedIn: true,
    showSignup: false,
    uid: id
  })
}

loginCallback(name, id) {
  this.setState({
    username: name,
    isLoggedIn: true,
    showLogin: false,
    uid: id
  }, () => console.log('APP state', this.state))
}

submitGraphicsCallback() {
  this.setState({
    showSubmitGraphics: false
  })
  this.child.refreshExplore();
}

  render() {
    return (
      <div>

        {this.state.isLoggedIn ? '' :
        <div className="signupForm" style={rightStyle}>
          <button onClick={this.showSignUp} style={buttonStyle}>Sign up</button>
          <button onClick={this.showLogin} style={buttonStyle}>Log in</button>
        </div> }

        {this.state.showSignup ?
          <Signup cb={this.signupCallback} style={rightStyle}/> : ''
        }

        {this.state.showLogin ?
          <Login cb={this.loginCallback} style={rightStyle}/> : ''
        }

        {this.state.username !== '' ?
          <div style={rightStyle}>
            <div classID='usernameDisplay' style={textAlign}> Hi, {this.state.username}!</div>
            <button className="submitgraphicsbutton" onClick={this.showSubmitGraphics} style={submitGraphicsButtonStyle}>Submit your graphics</button><br></br>
          </div>
            : ''
        }

        {this.state.showSubmitGraphics ?
          <div>
            <br></br>
            <SubmitGraphics artist={this.state.uid} style={rightStyle} cb={this.submitGraphicsCallback}/>
          </div> : ''
        }


        <div classID="home">
          <Home onRef={ref => (this.child = ref)}/>
        </div>
      </div>
    )
  }

};

const rightStyle = {
  float: "right"
}

const textAlign = {
  textAlign: 'center',
  fontSize: '17px'
}

const buttonStyle = {
  float: "right",
  backgroundColor: '#e7e7e7',
  color: 'black',
  width: '90px',
  padding: '5px',
  fontFamily: 'verdana',
  fontSize: '16px'
}

const submitGraphicsButtonStyle = {
  backgroundColor: "#6485ba",
  color: 'black',
  width: '180px',
  padding: '5px',
  fontFamily: 'verdana',
  fontSize: '14px',
  borderRadius: "75px"
}

export default App;
