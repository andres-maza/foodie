import React from 'react';

const LoadingAnim = (props) => {

  const loadIconDisplay = {
    display: 'inline-block'
  }

  if (!props.display) {
    loadIconDisplay.display = 'none'
  }

  return(
    <div className="load-icon" style={loadIconDisplay}></div>
  )
};

export default LoadingAnim;
