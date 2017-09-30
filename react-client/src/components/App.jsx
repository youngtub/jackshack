import React from 'react';
import Home from './Home.jsx';
import axios from 'axios';
import Signup from '../subcomponents/signup.jsx'
import Login from '../subcomponents/login.jsx'
import SubmitGraphics from '../subcomponents/submitGraphics.jsx';
import Bag from '../subcomponents/bag.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      uid:'',
      showSignup: false,
      showLogin: false,
      showSubmitGraphics: false,
      showBag: false,
      bag: []
    }
//bindings
this.showSignUp = this.showSignUp.bind(this);
this.showLogin = this.showLogin.bind(this);
this.showSubmitGraphics = this.showSubmitGraphics.bind(this);
this.showBagContents = this.showBagContents.bind(this);
this.logoutUser = this.logoutUser.bind(this);

this.signupCallback = this.signupCallback.bind(this);
this.loginCallback = this.loginCallback.bind(this);
this.submitGraphicsCallback = this.submitGraphicsCallback.bind(this);
this.addToBagCallback = this.addToBagCallback.bind(this);
// this.toggleChimney = this.toggleChimney.bind(this);
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

showBagContents() {
  this.state.showBag ? this.setState({showBag: false}) : this.setState({showBag: true})
}

signupCallback(name, id) {
  this.toggleChimney();
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
  }, this.addToBagCallback);
}

logoutUser() {
  this.setState({
    username: '',
    isLoggedIn: false,
    uid: ''
  })
}

toggleChimney() {
  $('.smoke').fadeToggle();
  setTimeout( () => $('.smoke').fadeToggle(2000), 5000)
}

componentDidMount() {
  $('.smoke').toggle();
}

submitGraphicsCallback(url) {
  this.setState({
    showSubmitGraphics: false
  })
  this.child.refreshExplore();
  this.child.previewCallback(url);
  this.toggleChimney();
}

addToBagCallback() {
  var newBag = [];
  axios.post('/api/getBagDetails', {
    customerid: this.state.uid
  })
  .then( (res) => {
    res.data.forEach( (shirt) => {
      axios.post('/api/getArtistNameForBag', {
        shirt: shirt
      })
      .then( (res) => {
        axios.post('/api/getGraphicTitleForBag', {
          shirt: res.data
        })
        .then( (res) => {
          newBag.push(res.data);
            this.setState({
              bag: newBag
            }, () => console.log('NEW Bag: ', this.state.bag))
        })
      });
    })
  })
  this.toggleChimney();
  // .then( () => {
  //   this.setState({
  //     bag: newBag
  //   }, () => console.log('NEW STATE: ', this.state.bag))
  // })
}

  render() {
    return (
      <div>
        <h1 style={bannerStyle}>JackShack</h1>
        {this.state.isLoggedIn ? '' :
        <div className="signupForm" style={rightStyle}>
          <button onClick={this.showSignUp} style={buttonStyle}>Sign up</button>
          <button onClick={this.showLogin} style={buttonStyle}>Log in</button>
        </div> }
        <br></br><br></br>
        {this.state.showSignup ?
          <Signup cb={this.signupCallback} style={rightStyle}/> : ''
        }

        {this.state.showLogin ?
          <Login cb={this.loginCallback} style={rightStyle}/> : ''
        }

        {this.state.isLoggedIn ?
          <div style={rightStyle}>
            <div classID='usernameDisplay' style={textAlign}> Hi, {this.state.username}!</div>
            <button className="submitgraphicsbutton" onClick={this.showSubmitGraphics} style={submitGraphicsButtonStyle}>Submit your graphics</button><br></br>
            <button className="logoutButton" onClick={this.logoutUser} style={submitGraphicsButtonStyle}>Log out</button><br></br>
            <button className="showBagButton" onClick={this.showBagContents} style={submitGraphicsButtonStyle}>Bag ({this.state.bag.length})</button>
          </div>
            : ''
        }

        {this.state.showSubmitGraphics ?
          <div>
            <br></br>
            <SubmitGraphics artist={this.state.uid} style={rightStyle} cb={this.submitGraphicsCallback}/>
          </div> : ''
        }

        <br></br>

        {this.state.showBag ?
          <div>
            <br></br><br></br><br></br><br></br><br></br>
            <Bag bagItems={this.state.bag} />
          </div> : '' }


        <div classID="home">
          <Home onRef={ref => (this.child = ref)} auth={this.state.isLoggedIn} uid={this.state.uid} addToBagCallback={this.addToBagCallback}/>
        </div>

          <img src='https://drive.google.com/uc?id=0BxlVLOVlVGhdcXZ3aENlckphT1U' className='smoke' style={chimneyStyle}></img>
          <img src='https://drive.google.com/uc?id=0BxlVLOVlVGhdQmtXTFVTTEVrN00' className='logo' style={logoStyle}></img>



      </div>

    )
  }

};

const chimneyStyle = {
  position: "absolute",
  left: "50%",
  top: "38%",
  opacity: '0.5',
}

const logoStyle = {
  opacity: "0.25",
  marginLeft: "4%",
  marginTop: "1%"
}

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

const bannerStyle = {
  width: "30%",
  margin: '0%'
}

export default App;
