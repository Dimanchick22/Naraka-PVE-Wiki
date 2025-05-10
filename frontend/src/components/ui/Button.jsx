// components/ui/Button.jsx
import React from 'react';

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "default",
  className = "",
  disabled = false,
  type = "button",
  block = false,
  icon = null,
  ...rest
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    size !== 'default' ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    icon ? 'btn-icon' : '',
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {icon && <span className="btn-icon-wrapper">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;