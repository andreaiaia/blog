import React from 'react';
import { getAllPostIds, getPostData } from '../../lib/posts';

import styles from './Blog.module.scss';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ postData }) => {
  const { data, content } = postData;
  const formattedDate = new Date(data.date).toDateString();
  const tags = data.tag.split(', ');

  return (
    <article className={styles.container}>
      <h1>{data.title}</h1>
      <div className={styles.meta}>
        <div>{formattedDate}</div>
        <div className={styles.tags}>
          {tags.map((tag, index) => {
            return (
              <p key={index} className={styles.tag}>
                {tag}
              </p>
            );
          })}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Post;
