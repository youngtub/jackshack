import React from 'react';
import axios from 'axios'

const Order = (props) => {

  const onCancel = () => {
    props.cancelCb();
  };

  const sizeChange = (e) => {
    props.sizecb(e.target.value)
  };

  const addToBag = () => {
    props.ordered();
    axios.post('/api/addToBag', {
      color: props.color,
      size: props.size,
      customerId: props.uid,
      graphicId: props.graphicId,
      artistId: props.artistId
    })
    .then( () => {
      props.addToBagCallback()
    })
  }

  return (
    <div className="orderForm">
      <h3 style={align}> Order </h3>
      <div className="sizeSelect" style={align}>
        <a>Size: </a>
        <select onChange={sizeChange}>
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
        <button onClick={addToBag}> Add to Bag </button>
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
