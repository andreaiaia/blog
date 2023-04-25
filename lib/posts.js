import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import emoji from 'remark-emoji';
import readingTime from 'reading-time';
import { formatDate } from './utils/formatDate';

const postsDirectory = path.join(process.cwd(), '/articles');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const regex = new RegExp(/\.mdx$/, 'i');
  const allPostsData = fileNames
    .filter((fileName) => regex.test(fileName))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);
      const formattedDate = formatDate(data.date);
      const tags = data.tag.split(',');

      return {
        id,
        ...data,
        tags,
        stats,
        formattedDate,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  const regex = new RegExp(/\.mdx$/, 'i');
  return fileNames
    .filter((fileName) => regex.test(fileName))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.mdx$/, ''),
        },
      };
    });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const formattedDate = formatDate(data.date);
  const tags = data.tag.split(',');

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(emoji, { accessible: true })
    .use(prism, { plugins: ['line-numbers'] })
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    content: contentHtml,
    data,
    tags,
    stats,
    formattedDate,
  };
}
