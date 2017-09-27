import React from 'react';
import axios from 'axios';

const Preview = (props) => {

  return (
    <div style={rightStyle}>
      <h3 style={alignHeader}> Preview your shirt here</h3>
      <div className="previewContainer" style={divStyle}>
        <img src="https://teemill.com/uploaded/public/58344ea7d34955.11549832.png" height={500} width={400} />
        <img src={props.img} height={100} width={100} style={overlayStyle} />
      </div>

    </div>
  )
};

const divStyle = {
  position: "relative",
  display: "inline block"
};

const overlayStyle = {
  position: "absolute",
  left: "150px",
  bottom: "270px"
}

const rightStyle = {
  border: "solid black 1px",
  borderRadius: "70px",
  margin: "auto",
  width: "28%",
  padding: "5px",
  float: "right"
}

const alignHeader = {
  float: "right",
  marginRight: "100px"
}

export default Preview;
