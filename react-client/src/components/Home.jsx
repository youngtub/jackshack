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
      preview: ['default', 'https://drive.google.com/open?id=0BxlVLOVlVGhdNE9rWllHNENBekk', 0, 0, 0, 'demo, mock', 0, 'JS', 0],
      sort: 'Recent',
      search: '',
      userid: 0
    }
    this.previewCallback = this.previewCallback.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.refreshExplore = this.refreshExplore.bind(this);
    this.sortCallback = this.sortCallback.bind(this);
    this.userSelectCallback = this.userSelectCallback.bind(this);
    this.fromAllUsers = this.fromAllUsers.bind(this);
  };

  componentDidMount() {
    axios.get('/api/showcase')
    .then( (res) => {
      console.log('showcase data in home', res.data);
      var currentShowcase = res.data;
      this.setState({
        showcase: currentShowcase
      })
    });

    axios.get('/api/explore')
    .then( (res) => {
      console.log('explore data in home', res.data);
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
      console.log('For Preview: ', res.data)
      this.setState({
        preview: res.data
      })
    })
  };

  userSelectCallback(str) {
    axios.post('/api/getuserid', {
      name: str
    })
    .then( (id) => {
      this.setState({
        userid: id.data
      })
    })
    .then( () => {
      var filteredByUser = this.state.explore.filter( (item) => item.artistId === this.state.userid);
      this.setState({
        explore: filteredByUser
      })
    })
    .then( () => {
      $(".exploreHeader").append(`<p id='byartist'> By ${str} </p>`);
      $(".backbutton").toggle();
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

  fromAllUsers() {
    $('#byartist').remove();
    $(".backbutton").toggle();
    this.setState({
      explore: this.state.library
    })
  }

  render() {
    return (

  <div>
    <div classID="showcase">
      <Showcase items={this.state.showcase} preview={this.previewCallback}/>
      <br></br>
    </div>

    <div classID="explore">

      <div classID="search">
        <Search searchcb={this.searchCallback} sortcb={this.sortCallback}/><br></br>
      </div>

      <button className="backbutton"onClick={this.fromAllUsers} style={backButton}> Back to all artists </button>

      <Explore items={this.state.explore} preview={this.previewCallback} sort={this.state.sort} search={this.state.search} user={this.state.userid} className="exploreBox"/>

    </div>

    <div classID="preview">
      <Preview details={this.state.preview} userselectcb={this.userSelectCallback} refresh={this.previewCallback} auth={this.props.auth} uid={this.props.uid} addToBagCallback={this.props.addToBagCallback}/>
    </div>

  </div>

)}

};

const backButton = {
  display: 'none',
  marginLeft: '13%',
  backgroundColor: '#e7e7e7',
  color: 'black',
  width: '200px',
  padding: '5px',
  fontSize: '16px'
}


export default Home;
