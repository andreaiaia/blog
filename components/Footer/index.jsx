import React, { useEffect, useState } from 'react';

import { GitHub, Instagram, Linkedin, Rss } from 'react-feather';

import ThemeSwitcher from '../ThemeSwitcher';
import NotByAi from './NotByAi';

import css from './Footer.module.scss';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const YEAR = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <ul className={css.links}>
          <li>
            <a href="/feed.xml">
              <Rss className={css.icon} alt="RSS feed" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/andreaiaia" target="_blank">
              <Instagram className={css.icon} alt="Instagram logo" />
            </a>
          </li>
          <li>
            <a href="https://github.com/andreaiaia" target="_blank">
              <GitHub className={css.icon} alt="Github logo" />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/andreaiaia/" target="_blank">
              <Linkedin className={css.icon} alt="Linkedin logo" />
            </a>
          </li>
        </ul>
        <small className={css.credits}>
          <time>{YEAR}</time> © Andrea Bianchi.
        </small>
        <div>
          <ThemeSwitcher cname={css.switcherStyle} />
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
