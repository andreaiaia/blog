import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import prism from 'remark-prism';
import emoji from 'remark-emoji';
import readingTime from 'reading-time';
import { formatDate } from './utils/formatDate';
import { PostData, Metadata, FullPost } from './types';

const postsDirectory = path.join(process.cwd(), '/articles');

export function getLatestPostsData() {
  const posts = getSortedPostsData();
  return posts.slice(0, 3);
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const regex = new RegExp(/\.mdx$/, 'i');
  const allPostsData: PostData[] = fileNames
    .filter((fileName) => regex.test(fileName))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content }: { data: Metadata; content: string } = matter(
        fileContents
      ) as unknown as { data: Metadata; content: string };
      const stats = readingTime(content);
      const formattedDate = formatDate(data.date);

      return {
        id,
        ...data,
        tags: data.tags,
        stats,
        formattedDate,
      } as PostData;
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

export async function getPostData(id: string): Promise<FullPost> {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content }: { data: Metadata; content: string } = matter(
    fileContents
  ) as unknown as { data: Metadata; content: string };
  const stats = readingTime(content);
  const formattedDate = formatDate(data.date);

  const processedContent = await remark()
    .use(remarkMdx)
    .use(emoji, { accessible: true })
    .process(content);
  // .use(prism, { plugins: ['line-numbers'] })
  const contentHtml = processedContent.toString();

  return {
    id,
    content: contentHtml,
    data,
    stats,
    formattedDate,
  };
}
