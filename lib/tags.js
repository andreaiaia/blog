import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { getAllPostIds } from './posts';
import kebabCase from './utils/kebabCase';
import readingTime from 'reading-time';
import { formatDate } from './utils/formatDate';

const postsDirectory = path.join(process.cwd(), '/articles');

export async function getAllTags() {
  const allIds = await getAllPostIds();

  let tagCount = {};
  // Iterate through each post, putting all found tags into `tags`
  allIds.forEach((post) => {
    const fullPath = path.join(postsDirectory, `${post.params.id}.mdx`);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(source);
    if (data.tag) {
      data.tag.split(',').forEach((tag) => {
        const formattedTag = kebabCase(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
}

export async function getSimilarPostsData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  const originalPostTags = data.tag.split(',');

  const fileNames = fs.readdirSync(postsDirectory);
  const regex = new RegExp(/\.mdx$/, 'i');
  const allPostsData = fileNames
    .filter((fileName) => regex.test(fileName))
    .filter((fileName) => fileName !== `${id}.mdx`)
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

  return allPostsData
    .sort((a, b) => {
      const commonElementsWithA = originalPostTags.filter((element) =>
        a.tags.includes(element)
      );
      const commonElementsWithB = originalPostTags.filter((element) =>
        b.tags.includes(element)
      );

      if (commonElementsWithA.length < commonElementsWithB.length) {
        return 1;
      } else {
        return -1;
      }
    })
    .slice(0, 6);
}
