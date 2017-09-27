import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Showcase from '../subcomponents/showcase.jsx'
import Explore from '../subcomponents/explore.jsx'
import Preview from '../subcomponents/preview.jsx'
import Search from '../subcomponents/search.jsx'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showcase: [],
      library: [],
      explore: [],
      preview: ['default', 'https://drive.google.com/open?id=0BxlVLOVlVGhdNE9rWllHNENBekk'],
    }
    this.previewCallback = this.previewCallback.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.refreshExplore = this.refreshExplore.bind(this);
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
      var initialExplore = res.data;
      this.setState({
        explore: initialExplore,
        library: initialExplore
      })
    });
  };

  refreshExplore() {
    console.log('I got called');
    axios.get('/api/explore')
    .then( (res) => {
      this.setState({
        explore: res.data,
        library: res.data
      })
    });
  }

  previewCallback(imgurl) {
    axios.post('/api/getdetails', {link: imgurl})
    .then( (res) => {
      console.log('res for preview', res)
      this.setState({
        preview: res.data
      })
    })
  };

  searchCallback(str) {
    if (str !== '') {
      var searched = this.state.library.filter( (item) => {
        return item.title.includes(str);
      })
      this.setState({
        explore: searched
      })
    } else {
      this.setState({
        explore: this.state.library
      })
    }

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
        <div classID="search">
          <Search cb={this.searchCallback} />
        </div>

      <Explore items={this.state.explore} preview={this.previewCallback} className="exploreBox"/>
    </div>

    <div classID="preview">
      <Preview details={this.state.preview} />
    </div>

  </div>

)}

};


export default Home;
