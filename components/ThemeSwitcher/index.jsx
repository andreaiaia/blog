import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'react-feather';

import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = ({ cname }) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setTheme('dark')}
        className={`${styles.Moon} ${cname}`}
      >
        <Moon />
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`${styles.Sun} ${cname}`}
      >
        <Sun />
      </button>
    </>
  );
};

export default ThemeSwitcher;
