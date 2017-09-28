import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Stars from 'react-stars'

const Preview = (props) => {

  const onClickUser = (e) => {
    var desired = $(e.target).text();
    props.userselectcb(desired);
  }

  const handleStarChange = (newRating) => {
    if (props.auth) {
      axios.post('/api/updateRating', {
        title: props.details[0],
        newRating: newRating
      })
      .then( () => {
        props.refresh(props.details[1])
      })
    } else {
      var alertMessage = `<p id='loginAlert' style="text-align: center; color: red; font-weight: bold"> Please Log in/Sign up to rate! [Click to hide]</p> `
      $('.previewContainer').append(alertMessage)
      $('#loginAlert').click( () => $('#loginAlert').remove())
    }
  };

  return (
    <div style={rightStyle} className="previewContainer">
      <h3 style={alignDescription}> Preview shirt </h3>
      <div style={divStyle}>
        <img src="https://teemill.com/uploaded/public/58344ea7d34955.11549832.png" height={500} width={400} />
        <img src={`https://drive.google.com/uc?id=${props.details[1].slice(33)}`} height={100} width={100} style={overlayStyle} />
        <p style={alignDescription}> "{props.details[0]}"</p>
        <p style={alignDescription}> By:</p>
        <p style={usernameDisplay} onClick={onClickUser}>{props.details[6]} </p>

        <p style={alignDescription}> Tags: {
            props.details[5].length ? props.details[5] : ''
          }</p>

        <p style={alignDescription}> View Count: {props.details[2]} </p>
        <br></br>

        <div style={alignStars}>
          <Stars value={props.details[4]} onChange={handleStarChange}/>
        </div>
        <p style={alignDescription}>Current Rating: {Math.round(props.details[4]*100)/100} ({props.details[3]} ratings) </p>
      </div>

    </div>
  )
};

const divStyle = {
  position: "relative",
  display: "inline block",
};

const alignStars = {
  position: "absolute",
  left: "175px",
  bottom: "25px"
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
  bottom: "505px"
}

const rightStyle = {
  border: "solid black 1px",
  borderRadius: "70px",
  margin: "auto",
  width: "26%",
  padding: "5px",
  float: "right"
}


const alignDescription = {
  textAlign: "center"
}

export default Preview;
