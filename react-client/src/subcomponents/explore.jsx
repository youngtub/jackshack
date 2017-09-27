import React from 'react';
import $ from 'jquery';

const getIdfromUrl = (url) => {
  //if logic for google drive link or not
  var id = url.slice(33);
  return `https://drive.google.com/uc?id=${id}`;
}

const Explore = (props) => {

  const setPreviewImage = (e) => {
    var attr = $(e.target).attr('src')
    props.preview(attr);
  }

  return (
    <div>
      <div className="exploreContainer" style={exploreContainer}>
        {props.items.map((entry) => (
          <img src={getIdfromUrl(entry.link)} onClick={setPreviewImage} height={140} width={140} style={exploreStyle} key={entry.link.slice(33)}/>
        ))}
      </div>
    </div>
  )
}

const exploreStyle = {
  padding: "20px"
}

const exploreContainer = {
  border: "solid black 1px",
  borderRadius: "70px",
  margin: "auto",
  width: "39%",
  padding: "10px",
  display: "inline block",
  float: "left"
}


export default Explore;
