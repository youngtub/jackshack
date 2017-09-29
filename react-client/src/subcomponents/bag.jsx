import React from 'react';

const Bag = (props) => {

  return (
    <div className="bagContainer" style={rightAlign}>
      {props.bagItems.length ? props.bagItems.map( (item) => (
        <div className="bagItem" style={bagItem}>
          <a> "{item.graphicTitle}" </a>
          <a> by {item.artistName} \\ </a>
          <a> {item.size} </a>
          <a> {item.color} </a>
          <img src={`https://drive.google.com/uc?id=${item.imgurl.slice(-28)}`} height={50} width={50}></img>
        </div>
      )) : ''}

    </div>
  )
};

const rightAlign = {
  float: "right",
  textAlign: "right",
  backgroundColor: "white"
}

const bagItem = {
  border: "solid black 1px",
  borderRadius: "10px",
  display: "inline block",
  padding: "5px"
}

export default Bag;
