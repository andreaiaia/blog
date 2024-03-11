import styles from './Divider.module.scss';

type PropsType = {
  size?: 'small' | 'medium' | 'large';
  cname?: string;
};

const Divider = ({ size = 'medium', cname }: PropsType) => {
  return <hr className={`${styles.separator} ${styles[size]} ${cname}`} />;
};

export default Divider;
