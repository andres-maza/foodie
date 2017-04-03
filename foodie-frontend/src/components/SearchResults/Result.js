import React from 'react';
import { Link } from 'react-router';

const Result = (props) => {
  let starRating = [];

  for (let i = 0; i < Math.floor(props.rating); i++) {
    starRating.push(<i className="fa fa-star-o"></i>);
  }

  return(
    <div className="search-result">
      <h2>{props.name}</h2>
      <ul>
        <li><strong>Categories:</strong> {props.categories}</li>
        <li><strong>Address:</strong> {props.address}</li>
        <li><strong>Price:</strong> {props.price}</li>
        <li><strong>Rating:</strong> {starRating}</li>
        <li><strong>Delivery:</strong> {props.delivery}</li>
      </ul>
      <a href={`${props.url}`} target="_blank">
        <button className="secondary-btn">View on Yelp</button>
      </a>
    </div>
  )
};

export default Result;
