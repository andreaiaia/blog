import React from 'react';

import css from './Hero.module.scss';

const Hero = ({ children, cname, background }) => {
  return (
    <section className={`${css.hero} ${cname} ${css[background]}`}>
      <div className={`${css.content}`}>{children}</div>
    </section>
  );
};

export default Hero;
