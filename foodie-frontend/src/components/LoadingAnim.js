import React from 'react';

const LoadingAnim = (props) => {

  const loadIconDisplay = {
    display: 'flex'
  }
  // If props.display is false, set display of class to none
  if (!props.display) {
    loadIconDisplay.display = 'none'
  }

  return(
    <div className="load-icon-container" style={loadIconDisplay}>
      <div className="load-icon"></div>
    </div>
  )
};

export default LoadingAnim;
