import React from 'react';

const Order = (props) => {

  const onCancel = () => {
    props.cancelCb();
  }

  return (
    <div className="orderForm">
      <h3 style={align}> Order </h3>
      <div className="sizeSelect" style={align}>
        <a>Size: </a>
        <select>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div><br></br>

      <div className="colorConfirmation" style={align}>
          <a> Colour: {props.color}</a>
      </div><br></br>

      <div className="proceed" style={align}>
        <button> Add to Bag </button>
        <button> Checkout </button>
        <button onClick={onCancel}> Cancel </button>
        <br></br>
      </div>

    </div>
  )
};

const align = {
  textAlign: "center"
}

export default Order;
