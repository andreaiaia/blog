import React from 'react';

import css from './Hero.module.scss';

type Props = {
  children: React.ReactNode;
  cname?: string;
  background?: 'transparent' | 'primary' | 'secondary' | 'tertiary' | 'info';
};

const Hero = ({ children, cname, background = 'tertiary' }: Props) => {
  return (
    <section className={`${css.hero} ${cname} ${css[background]}`}>
      <div className={`${css.content}`}>{children}</div>
    </section>
  );
};

export default Hero;
