import React from 'react';
import axios from 'axios';

class SubmitGraphics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      title: ''
    }
    //bindings
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  //functions
  handleUrlChange(e) {
    this.setState({
      img: e.target.value
    })
  };

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  };

  handleSubmit() {
    if (this.state.img !== '') {
      axios.post('/api/submitgraphic', {
        url: this.state.img,
        artist: this.props.artist,
        title: this.state.title
      })
      .then( () => {
        this.setState({
          img: '',
          title: ''
        }, this.triggerCallback)
      })
    }
  };

  handleCancel() {
    this.setState({
      img: '',
      title: ''
    }, this.triggerCallback)
  }

  triggerCallback() {
    this.props.cb(); //unbound
  }

          // <p style={infoStyle}> `Submit a Google drive link (should look like this: https://drive.google.com/open?id=0BxlVLOVlVGhdMlY2YXloUC02d1k)`</p>

  render() {
    return (

      <div classID="submitGraphicsFormContainer" style={rightStyle}>
        <input onChange={this.handleUrlChange} type='text' placeholder='Google drive link' value={this.state.img} style={rightStyle}></input><br></br>
        <input onChange={this.handleTitleChange} type='text' placeholder='Title' value={this.state.title} style={rightStyle}></input><br></br>
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>

    )
  }
};

const rightStyle = {
  marginLeft: "auto",
  marginRight: "5px",
  float: "right"
}

const infoStyle = {
  fontSize: "9px",
  float: "right",
}

export default SubmitGraphics;
