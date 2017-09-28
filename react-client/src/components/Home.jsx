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
      sort: '',
      search: ''
    }
    this.previewCallback = this.previewCallback.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.refreshExplore = this.refreshExplore.bind(this);
    this.sortCallback = this.sortCallback.bind(this);
    this.userSelectCallback = this.userSelectCallback.bind(this);
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

    this.props.onRef(this)

  };

  refreshExplore() {
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
      this.setState({
        preview: res.data
      })
    })
  };

  userSelectCallback(str) {
    this.setState({
      search: str  //have to modify to look for user
    })
  }

  searchCallback(str) {
    this.setState({
      search: str
    })
  };

  sortCallback(str) {
    this.setState({
      sort: str
    })
  }

  render() {
    return (

  <div>

    <h1>JackShack</h1>
    <div classID="showcase">
      <Showcase items={this.state.showcase} preview={this.previewCallback}/>
      <br></br>
    </div>

    <div classID="explore">

        <div classID="search">
          <Search searchcb={this.searchCallback} sortcb={this.sortCallback}/><br></br>
        </div>

      <Explore items={this.state.explore} preview={this.previewCallback} sort={this.state.sort} search={this.state.search} className="exploreBox"/>
    </div>

    <div classID="preview">
      <Preview details={this.state.preview} userselectcb={this.userSelectCallback}/>
    </div>

  </div>

)}

};

export default Home;
