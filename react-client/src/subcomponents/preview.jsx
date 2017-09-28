import React from 'react';
import axios from 'axios';
import $ from 'jquery';

const Preview = (props) => {

  const onClickUser = (e) => {
    var desired = $(e.target).text().slice(5);
    props.userselectcb(desired);
  }

  return (
    <div style={rightStyle}>
      <h3 style={alignDescription}> Preview shirt </h3>
      <div className="previewContainer" style={divStyle}>
        <img src="https://teemill.com/uploaded/public/58344ea7d34955.11549832.png" height={500} width={400} />
        <img src={`https://drive.google.com/uc?id=${props.details[1].slice(33)}`} height={100} width={100} style={overlayStyle} />
        <p style={alignDescription}> "{props.details[0]}"</p>
        <p style={alignDescription} onClick={onClickUser}> By: {props.details[3]} </p>
        <p style={alignDescription}> View Count: {props.details[2]} </p>
      </div>

    </div>
  )
};

const divStyle = {
  position: "relative",
  display: "inline block",
};

const overlayStyle = {
  position: "absolute",
  left: "150px",
  bottom: "370px"
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
