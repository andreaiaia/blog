import Link from 'next/link';

import ThemeSwitcher from '@components/ThemeSwitcher';
import NotByAi from './NotByAi';

import { GitHub, Instagram, Linkedin, Rss } from 'react-feather';
import css from './Footer.module.scss';

const Footer = () => {
  const YEAR = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <ul className={css.socialLinks}>
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
        <div className={css.themeSwitcher}>
          <ThemeSwitcher />
        </div>
        <div className={css.otherLinks}>
          <p className={css.smallTitle}>Links</p>
          <ul>
            <li className={css.footerLink}>
              <Link href="/blog/bookmarks">Bookmarks</Link>
            </li>
          </ul>
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
