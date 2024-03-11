import styles from './Tag.module.scss';

type Props = {
  tag: string;
  to?: string;
  anchor?: boolean;
};

const Tag = ({ tag, to, anchor }: Props) => {
  if (anchor)
    return (
      <a href={to} className={styles.tag}>
        {tag}
      </a>
    );
  else
    return (
      <a href={to || '#'} className={styles.tag}>
        {tag}
      </a>
    );
};

export default Tag;
