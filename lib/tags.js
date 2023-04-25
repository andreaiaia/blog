import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { getAllPostIds } from './posts';
import kebabCase from './utils/kebabCase';

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
