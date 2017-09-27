import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Showcase from '../subcomponents/showcase.jsx'
import Explore from '../subcomponents/explore.jsx'
import Preview from '../subcomponents/preview.jsx'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showcase: [],
      explore: [],
      preview: ''
    }
    this.previewCallback = this.previewCallback.bind(this);
  };

  componentDidMount() {
    axios.get('/api/showcase')
    .then( (res) => {
      console.log('showcase data in home', res);
      var currentShowcase = res.data;
      this.setState({
        showcase: currentShowcase
      })
    });

    axios.get('/api/explore')
    .then( (res) => {
      console.log('explore data in home', res);
      var currentExplore = res.data;
      this.setState({
        explore: currentExplore
      })
    });
  };

  previewCallback(imgurl) {
    this.setState({
      preview: imgurl
    })
  };

  render() {
    return (

  <div>

    <h1>JackShack</h1>
    <div classID="showcase">
      <Showcase items={this.state.showcase} preview={this.previewCallback}/>
    </div>

    <div classID="explore">
      <h3>Explore Designs</h3>
      <Explore items={this.state.explore} preview={this.previewCallback} className="exploreBox"/>
    </div>

    <div classID="preview">
      <Preview img={this.state.preview}/>
    </div>

  </div>

)}

};


export default Home;
