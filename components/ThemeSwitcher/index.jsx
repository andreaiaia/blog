import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'react-feather';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (theme === 'light')
    return (
      <button onClick={() => setTheme('dark')}>
        <Moon />
      </button>
    );

  return (
    <button onClick={() => setTheme('light')}>
      <Sun />
    </button>
  );
};

export default ThemeSwitcher;
