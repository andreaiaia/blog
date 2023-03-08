import React, { Children } from 'react';

import { useRouter } from 'next/router';
import cx from 'classnames';
import Link from 'next/link';

import styles from './NavLink.module.scss';

const NavLink = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const isActive = asPath === props.href || asPath === props.as;

  const className = cx(childClassName, { [styles.active]: isActive });

  return (
    <li>
      <Link {...props} legacyBehavior>
        {React.cloneElement(child, {
          className: className || null,
        })}
      </Link>
    </li>
  );
};

export default NavLink;
