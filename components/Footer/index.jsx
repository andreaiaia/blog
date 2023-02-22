import React from 'react';

import { GitHub, Instagram, Linkedin } from 'react-feather';

import styles from './Footer.module.scss';

const Footer = () => {
  const YEAR = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <ul className={styles.socials}>
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
      <small className={styles.rss}>
        <a href="/feed.xml">RSS</a>
      </small>
    </footer>
  );
};

export default Footer;
