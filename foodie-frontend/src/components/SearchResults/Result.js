import React from 'react';

const Result = (props) => {
  return(
    <div className="search-result">
      <h2>{props.name}</h2>
      <ul>
        <li>Categories: {props.categories}</li>
        <li>Address: {props.address}</li>
        <li>Price: {props.price}</li>
        <li>Rating: {props.rating}</li>
        <li>Delivery: {props.delivery}</li>
      </ul>
    </div>
  )
};

export default Result;
