import React from 'react';

import { XCircle } from 'react-feather';

import styles from './Modal.module.scss';

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalContainer} role="dialog" aria-modal="true">
      <button className={styles.closeBtn} onClick={onClose}>
        <XCircle />
      </button>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
