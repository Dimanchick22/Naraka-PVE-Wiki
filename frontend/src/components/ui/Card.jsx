// components/ui/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = "", 
  variant = "default",
  ...rest 
}) => {
  return (
    <div 
      className={`card ${variant !== 'default' ? `card-${variant}` : ''} ${className}`} 
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;