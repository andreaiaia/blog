// import React from 'react';
// import { getSortedPostsData } from '../../lib/posts';
// import { useRouter } from 'next/router';
// import Hero from '../../components/Hero';

// import css from './Tags.module.scss';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: { allPostsData },
//   };
// }

// export async function getStaticPaths() {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }

// const TagName = () => {
//   const { tag } = useRouter().query;
//   return tag || null;
// };

// const tags = () => {
//   return (
//     <main>
//       <Hero cname={css.hero}>
//         <div>
//           <h1 className={css.title}>Tags</h1>
//           <p>All tagged posts</p>
//         </div>
//       </Hero>
//       Posts Tagged with “<TagName />”
//     </main>
//   );
// };

// export default tags;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import React from 'react';

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const fileNames = fs.readdirSync(postsDirectory);

  const tags = fileNames.reduce((allTags, fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContents);

    return frontmatter.tag
      ? [...new Set([...allTags, ...frontmatter.tag])]
      : allTags;
  }, []);

  const paths = tags.map((tag) => ({ params: { tag } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContents);

      if (frontmatter.tag && frontmatter.tag.includes(params.tag)) {
        return {
          slug: fileName.replace(/\.md$/, ''),
          frontmatter,
        };
      }
    })
    .filter(Boolean);

  return {
    props: {
      posts,
      tag: params.tag,
    },
  };
}

const Tag = ({ posts, tag }) => {
  return (
    <>
      <h1>Posts tagged &quot;{tag}&quot;</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.frontmatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tag;
