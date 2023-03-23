import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { GitHub, Instagram, Linkedin, Rss } from 'react-feather';

import ThemeSwitcher from '../ThemeSwitcher';

import styles from './Footer.module.scss';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const [notByAiBadge, setNotByAiBadge] = useState('/notByAiBadge-white.svg');
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === 'dark') setNotByAiBadge('/notByAiBadge-black.svg');
    else setNotByAiBadge('/notByAiBadge-white.svg');
  }, [theme]);

  if (!mounted) return null;

  const YEAR = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <ul className={styles.links}>
          <li>
            <a href="/feed.xml">
              <Rss className={styles.icon} alt="RSS feed" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/andreaiaia" target="_blank">
              <Instagram className={styles.icon} alt="Instagram logo" />
            </a>
          </li>
          <li>
            <a href="https://github.com/andreaiaia" target="_blank">
              <GitHub className={styles.icon} alt="Github logo" />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/andreaiaia/" target="_blank">
              <Linkedin className={styles.icon} alt="Linkedin logo" />
            </a>
          </li>
        </ul>
        <small className={styles.credits}>
          <time>{YEAR}</time> © Andrea Bianchi.
        </small>
        <div className={styles.themeSwitcher}>
          <ThemeSwitcher />
        </div>
        <div className={styles.notAiBadge}>
          <a href="https://notbyai.fyi/">
            <Image
              src={notByAiBadge}
              alt="Badge certifying this website and its contents are human made - no AI involved"
              height={84}
              width={120}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
