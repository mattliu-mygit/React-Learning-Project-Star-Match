import React from 'react';
import colors from "../colors"

const NumberButton = props => (
    // Depends on closures
    <button  
      className = "number" 
      style = {{ background: colors[props.status]}}
      onClick = {
        () => props.onClick(props.number, props.status)
      }> 
      {props.number} 
    </button>
  );
export default NumberButton;