import React from 'react';
import Home from './Home.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      uid:''
    }
//bindings
  }

//functions

  render() {
    return (
      <div>
        <div classID="home">
          <Home/>
        </div>
      </div>
    )
  }

};

export default App;
