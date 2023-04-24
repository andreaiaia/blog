import React from 'react';

import css from './Button.module.scss';

const Button = ({
  onClick = null,
  type = 'button',
  secondary,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${css.button} ${className} ${secondary && css.secondary}`}
    >
      {children}
    </button>
  );
};

export default Button;
