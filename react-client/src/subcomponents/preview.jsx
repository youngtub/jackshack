import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Stars from 'react-stars';
import Order from './order.jsx';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'White',
      showDetails: true,
      showOrderForm: false
    }
    //bindings
    this.onClickUser = this.onClickUser.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handleShirtColorChange = this.handleShirtColorChange.bind(this);
    this.openOrderForm = this.openOrderForm.bind(this);
    this.cancelOrderCallback = this.cancelOrderCallback.bind(this);
  }

    onClickUser(e) {
    var desired = $(e.target).text();
    this.props.userselectcb(desired);
  }

    handleStarChange(newRating) {
    if (this.props.auth) {
      axios.post('/api/updateRating', {
        title: this.props.details[0],
        newRating: newRating
      })
      .then( () => {
        this.props.refresh(this.props.details[1])
      })
    } else {
      var alertMessage = `<p id='loginAlert' style="text-align: center; color: red; font-weight: bold"> Please Log in/Sign up to rate! [Click to hide]</p> `
      $('.previewContainer').append(alertMessage)
      $('#loginAlert').click( () => $('#loginAlert').remove())
    }
  };

    handleShirtColorChange(e){
    var newColor = e.target.value;
    this.setState({
      color: e.target.value
    })
    const colorPicker = {
      'Black' : 'https://teemill.com/uploaded/public/583c37d32fe816.11282353.png',
      'Bright Blue' : 'https://teemill.com/uploaded/public/595e0d5feeae61.28611647.png',
      'Navy Blue' : 'https://teemill.com/uploaded/public/595e17c7bfac27.43854672.png',
      'Dark Grey' : 'https://teemill.com/uploaded/public/595e0dde4fb493.81681537.png',
      'Light Grey' : 'https://teemill.com/uploaded/public/598dcff322e268.72994500.png',
      'Red' : 'https://teemill.com/uploaded/public/595e154ab48682.49788334.png',
      'White' : 'https://teemill.com/uploaded/public/58344ea7d34955.11549832.png'
    };
    $('.shirtColor').attr('src', colorPicker[newColor])
  };

  openOrderForm() {
    if (this.props.auth) {
      $('.orderButton').toggle();
      this.setState({
        showOrderForm: true,
        showDetails: false
      })
    } else {
      var alertMessage = `<p id='loginAlert' style="text-align: center; color: red; font-weight: bold"> Please Log in/Sign up to Order! [Click to hide]</p> `
      $('.previewContainer').append(alertMessage)
      $('#loginAlert').click( () => $('#loginAlert').remove())
    }
  }

  cancelOrderCallback() {
    $('.orderButton').toggle();
    this.setState({
      showDetails: true,
      showOrderForm: false
    })
  }

  render() {
    return (
      <div style={boxStyle} className="previewContainer">
        <h3 style={alignDescription}> Preview shirt </h3>

        <div style={alignDescription}>
          <select onChange={this.handleShirtColorChange} style={alignColorSelect}>
            <option>White</option>
            <option>Black</option>
            <option>Bright Blue</option>
            <option>Navy Blue</option>
            <option>Dark Grey</option>
            <option>Light Grey</option>
            <option>Red</option>
            <option>Green</option>
          </select>
        </div>

        <div style={divStyle}>
          <img src="https://teemill.com/uploaded/public/58344ea7d34955.11549832.png" height={500} width={400} className="shirtColor"/>
          <img src={`https://drive.google.com/uc?id=${this.props.details[1].slice(33)}`} height={100} width={100} style={overlayStyle} />

            <p style={titleStyle}> "{this.props.details[0]}"</p>

          <div className="usernameDisplay" style={alignDescription}>
            <a> By: </a>
            <a style={usernameDisplay} onClick={this.onClickUser}>{this.props.details[6]} </a>
          </div>
              { this.state.showDetails ?
              <div className="productDetails">
                <p style={alignDescription}> Tags: {
                    this.props.details[5].length ? this.props.details[5] : ''
                  }</p>

                <p style={alignDescription}> View Count: {this.props.details[2]} </p>
                  <br></br>

                  <div style={alignStars}>
                    <Stars value={this.props.details[4]} onChange={this.handleStarChange}/>
                  </div>
                  <p style={alignDescription}>Current Rating: {Math.round(this.props.details[4]*100)/100} ({this.props.details[3]} ratings) </p>
              </div>
              : ''}

            <div className="orderButton" style={alignDescription}>
              <button onClick={this.openOrderForm}> Order </button>
            </div>

            <div className="orderForm">
            {this.state.showOrderForm ?
              <Order color={this.state.color} cancelCb={this.cancelOrderCallback}/> : ''}
            </div>

          </div>

        </div>
      )
  }

};

const boxStyle = {
  float: "right",
  height: "44%",
  border: "solid black 1px",
  borderRadius: "70px",
  margin: "auto",
  width: "26%",
  padding: "5px",
}

const divStyle = {
  position: "relative",
  display: "inline block",
};

const alignColorSelect = {
  margin: "auto"
}

const alignStars = {
  position: "absolute",
  left: "175px",
  bottom: "70px"
}

const usernameDisplay = {
  textAlign: "center",
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer"
}

const overlayStyle = {
  position: "absolute",
  left: "150px",
  top: "140px"
}

const titleStyle = {
  textAlign: "center",
  fontSize: '20px',
  fontStyle: "italic"
}

const alignDescription = {
  textAlign: "center"
}

export default Preview;
