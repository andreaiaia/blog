import styles from './Banner.module.scss';

type Props = {
  title: string;
  text: string;
};

const Banner = ({ title, text }: Props) => {
  return (
    <section className={styles.banner}>
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
};

export default Banner;
