import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'react-feather';

import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button onClick={() => setTheme('dark')} className={styles.Moon}>
        <Moon />
      </button>
      <button onClick={() => setTheme('light')} className={styles.Sun}>
        <Sun />
      </button>
    </>
  );
};

export default ThemeSwitcher;
