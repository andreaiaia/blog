// // import 'server-only';
// import fs from 'fs';
// import matter from 'gray-matter';
// import path from 'path';
// import { getAllPostIds } from './posts';
// import kebabCase from './utils/kebabCase';
// import readingTime from 'reading-time';
// import { formatDate } from './utils/formatDate';
// import type { PostData, Metadata } from './types';

// const postsDirectory = path.join(process.cwd(), '/articles');

// export function getAllTags() {
//   const allIds = getAllPostIds();

//   let tagCount: { [key: string]: number } = {};
//   // Iterate through each post, putting all found tags into `tags`
//   allIds.forEach((post) => {
//     const fullPath = path.join(postsDirectory, `${post.params.id}.mdx`);
//     const source = fs.readFileSync(fullPath, 'utf8');
//     const { data } = matter(source);
//     if (data.tags) {
//       data.tags.forEach((tag: string) => {
//         const formattedTag = kebabCase(tag);
//         if (formattedTag in tagCount) {
//           tagCount[formattedTag] += 1;
//         } else {
//           tagCount[formattedTag] = 1;
//         }
//       });
//     }
//   });

//   return tagCount;
// }

// export function getSimilarPostsData(id: string): PostData[] {
//   const fullPath = path.join(postsDirectory, `${id}.mdx`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');
//   const { data: originalData } = matter(fileContents);

//   const fileNames = fs.readdirSync(postsDirectory);
//   const regex = new RegExp(/\.mdx$/, 'i');
//   const allPostsData: PostData[] = fileNames
//     .filter((fileName) => regex.test(fileName))
//     .filter((fileName) => fileName !== `${id}.mdx`)
//     .map((fileName) => {
//       const id = fileName.replace(/\.mdx$/, '');
//       const fullPath = path.join(postsDirectory, fileName);
//       const fileContents = fs.readFileSync(fullPath, 'utf8');
//       const { data, content }: { data: Metadata; content: string } = matter(
//         fileContents
//       ) as unknown as { data: Metadata; content: string };
//       const stats = readingTime(content);
//       const formattedDate = formatDate(data.date);

//       return {
//         id,
//         ...data,
//         tags: data.tags,
//         stats,
//         formattedDate,
//       };
//     });

//   return allPostsData
//     .sort((a, b) => {
//       const commonElementsWithA = originalData.tags.filter((element: string) =>
//         a.tags.includes(element)
//       );
//       const commonElementsWithB = originalData.tags.filter((element: string) =>
//         b.tags.includes(element)
//       );

//       if (commonElementsWithA.length < commonElementsWithB.length) {
//         return 1;
//       } else {
//         return -1;
//       }
//     })
//     .slice(0, 6);
// }
