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
    props.preview(attr);
  }

  return (
    <div >
    <h2 style={header}>Showcase</h2>
      <div className="showcaseContainer" style={showcaseContainer}>
        {props.items.length ? props.items.map((entry) => (
          <img src={getIdfromUrl(entry.link)} onClick={setPreviewImage} height={150} width={150} style={showcaseStyle} key={entry.link.slice(33)}/>
        )) : ''}
      </div>
    </div>
  )
}

const showcaseStyle = {
  padding: "10px",
  border: "solid white 2px",
  display: 'inline block',
}

const header = {
  textAlign: "center",
}

const showcaseContainer = {
  border: "solid black 1px",
  borderRadius: "70px",
  margin: "auto",
  width: "50%",
  height: '25%',
  padding: "15px",
  backgroundColor: "black",
  textAlign: "center"
}

export default Showcase;
