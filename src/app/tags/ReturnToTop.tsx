'use client';

import React from 'react';

import css from './Tags.module.scss';

const ReturnToTop = () => {
  const returnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

  return (
    <button className={css.toTop} onClick={() => returnToTop()}>
      Return to top
    </button>
  );
};

export default ReturnToTop;
