'use client';
import React, { useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
require('prismjs/components/prism-bash');
import emoji from 'remark-emoji';

import css from './PostContent.module.scss';

const PostContent = ({ markdownContent }: { markdownContent: string }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <article className={css.postContent}>
      <ReactMarkdown remarkPlugins={[emoji]}>{markdownContent}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
