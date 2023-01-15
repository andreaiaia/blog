import React from 'react'

import {
  Archive,
  Bookmark,
  Camera,
  GitHub,
  Home,
  Instagram,
  Linkedin,
  Menu,
  PenTool,
  XCircle,
} from 'react-feather'

import styles from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <span className={styles.options}>
        <XCircle />
      </span>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="./index">
              <Home className={styles.icon} />
              Home
            </a>
          </li>
          <li>
            <a href="./Posts">
              <Bookmark className={styles.icon} />
              Posts
            </a>
          </li>
          <li>
            <a href="./Photos">
              <Camera className={styles.icon} />
              Photos
            </a>
          </li>
        </ul>
      </nav>
      <small className={styles.socials}>
        <ul className={styles.socialsLinks}>
          <li>
            <a href="https://instagram.com/andreaiaia">
              <Instagram className={styles.icon} />
            </a>
          </li>
          <li>
            <a href="https://github.com/andreaiaia">
              <GitHub className={styles.icon} />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/andreaiaia/">
              <Linkedin className={styles.icon} />
            </a>
          </li>
        </ul>
      </small>
    </header>
  )
}
