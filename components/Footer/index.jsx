import React, { useEffect, useState } from 'react';

import { GitHub, Instagram, Linkedin, Rss } from 'react-feather';

import ThemeSwitcher from '../ThemeSwitcher';
import NotByAi from './NotByAi';

import styles from './Footer.module.scss';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            <NotByAi />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
