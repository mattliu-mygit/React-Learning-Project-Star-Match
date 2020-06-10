import React from 'react';
import utils from "../math-utils"

const StarDisplay = props => (
    <>
    {utils.range(1, props.stars).map((starID) =>
      <div 
        key = {starID} 
        className = "star" 
        />            
    )}
    </>
  );
  export default StarDisplay;