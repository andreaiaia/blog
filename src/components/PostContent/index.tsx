'use client';
import React, { useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
require('prismjs/components/prism-bash');

import css from './PostContent.module.scss';

const PostContent = ({ markdownContent }: { markdownContent: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <article className={css.postContent}>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={markdownContent} />
    </article>
  );
};

export default PostContent;
