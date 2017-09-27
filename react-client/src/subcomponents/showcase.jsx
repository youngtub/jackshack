import React from 'react';
import path from 'path';
import $ from 'jquery';

const getIdfromUrl = (url) => {
  //if logic for google drive link or not
  var id = url.slice(33);
  return `https://drive.google.com/uc?id=${id}`;
}

const Showcase = (props) => {

  const setPreviewImage = (e) => {
    var attr = $(e.target).attr('src')
    console.log(attr)
    props.preview(attr);
  }

  return (
    <div>
    <h3>Showcase</h3>
      <div className="showcaseContainer" style={showcaseContainer}>
        {props.items.map((entry) => (
          <img src={getIdfromUrl(entry.link)} onClick={setPreviewImage} height={150} width={150} style={showcaseStyle} key={entry.link.slice(33)}/>
        ))}
      </div>
    </div>
  )
}

const showcaseStyle = {
  padding: "20px"
}

const showcaseContainer = {
  border: "solid black 1px",
  borderRadius: "70px",
  margin: "auto",
  width: "50%",
  padding: "10px"
}

export default Showcase;
