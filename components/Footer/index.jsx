import React from 'react';

import { GitHub, Instagram, Linkedin, Rss } from 'react-feather';

import ThemeSwitcher from '../ThemeSwitcher';

import styles from './Footer.module.scss';

const Footer = () => {
  const YEAR = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
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
    </footer>
  );
};

export default Footer;
