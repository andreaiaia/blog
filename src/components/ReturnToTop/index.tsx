'use client';
import css from './ReturnToTop.module.scss';

const ReturnToTop = () => {
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={css.toTop} onClick={() => toTop()}>
      Return to top
    </button>
  );
};

export default ReturnToTop;
