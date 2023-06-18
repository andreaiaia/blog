import React from 'react';

import { GitHub, Instagram, Linkedin, Rss } from 'react-feather';

import ThemeSwitcher from '../ThemeSwitcher';
import NotByAi from './NotByAi';

import css from './Footer.module.scss';

const Footer = () => {
  const YEAR = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <ul className={css.links}>
          <li>
            <a href="/feed.xml">
              <Rss className={css.icon} />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/andreaiaia" target="_blank">
              <Instagram className={css.icon} />
            </a>
          </li>
          <li>
            <a href="https://github.com/andreaiaia" target="_blank">
              <GitHub className={css.icon} />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/andreaiaia/" target="_blank">
              <Linkedin className={css.icon} />
            </a>
          </li>
        </ul>
        <small className={css.credits}>
          <time>{YEAR}</time> © Andrea Bianchi.
        </small>
        <div>
          <ThemeSwitcher />
        </div>
        <div className={css.notAiBadge}>
          <a href="https://notbyai.fyi/">
            <NotByAi />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
