import React from 'react';

const Bag = (props) => {

  return (
    <div className="bagContainer" style={bagContainerStyle}>
      {props.bagItems.length ? props.bagItems.map( (item) => (
        <div className="bagItem" style={bagItem}>
          <a> "{item.graphicTitle}" </a>
          <a> by {item.artistName} \\ </a>
          <a> {item.size} </a>
          <a> {item.color} </a>
          <img src={`https://drive.google.com/uc?id=${item.imgurl.slice(-28)}`} height={50} width={50}></img>
        </div>
      )) : ''}
      <div style={checkoutButton}>
        <button style={checkoutButtonStyle}> Checkout </button>
        <button style={checkoutButtonStyle} onClick={props.close}> Close Bag </button>
      </div>
    </div>
  )
};

const bagContainerStyle = {
  textAlign: "right",
  position: "absolute",
  left: "79%",
  width: "20%",
  zIndex: "3",
}

const bagItem = {
  border: "solid black 1px",
  borderRadius: "10px",
  display: "inline block",
  padding: "5px",
  backgroundColor: "white",
}

const checkoutButton = {
  textAlign: "center",
  backgroundColor: "transparent",
  borderRadius: "75px"
}

const checkoutButtonStyle = {
  height: "40px",
  fontSize: "14px",
  backgroundColor: "#9db5db"
}

export default Bag;
