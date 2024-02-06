import React from 'react';

import css from './Button.module.scss';

type PropsType = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  secondary?: boolean;
  cname?: string;
  children: JSX.Element;
};

const Button = ({
  onClick,
  type = 'button',
  secondary,
  cname,
  children,
}: PropsType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${css.button} ${cname} ${secondary && css.secondary}`}
    >
      {children}
    </button>
  );
};

export default Button;
