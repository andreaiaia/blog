import React from 'react';

import {
  Archive,
  Camera,
  GitHub,
  User,
  Instagram,
  Linkedin,
  Menu,
  XCircle,
} from 'react-feather';

const Footer = () => {
  const YEAR = new Date().getFullYear();

  return (
    <footer>
      {/* <div className={styles.options}>
        <button onClick={handleMenu}>
          <Menu alt="Open menu button" />
        </button>
        <ThemeSwitcher />
      </div>
      <button className={styles.closeMenu} onClick={handleMenu}>
        <XCircle alt="Close menu button" />
      </button> */}

      <small className={styles.socials}>
        <ul className={styles.socialsLinks}>
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
        <div className={styles.credits}>
          <time>{YEAR}</time> © Andrea Bianchi.{' '}
          <a className={styles.rss} href="/feed.xml">
            RSS
          </a>
        </div>
      </small>
    </footer>
  );
};

export default Footer;
