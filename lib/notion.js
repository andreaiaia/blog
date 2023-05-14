import { Client } from '@notionhq/client';
import slugify from 'slugify';
import readingTime from 'reading-time';
import { formatDate } from './utils/formatDate';
import { getPlainText } from './notionBlockRenderer';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

export const getAllPosts = async (databaseId) => {
  const database = await getDatabase(databaseId);

  // TODO Forse è il caso di restituire solo id e slug
  // TODO e poi fare una chiamata per ogni post per ottenere il resto dei dati

  const postsPromises = database.map(async (post) => ({
    id: post.id,
    slug: slugify(post.properties.title.title[0]?.plain_text),
    title: post.properties.title.title[0]?.plain_text,
    description: post.properties.description.rich_text[0]?.plain_text,
    tags: post.properties.tags.multi_select?.map((tag) => tag.name),
    formattedDate: formatDate(post.last_edited_time),
    stats: await getReadingTime(post.id),
    pic: post.properties.pic.files[0]?.file.url,
    content: await getBlocks(post.id),
  }));

  const posts = await Promise.all(postsPromises);

  return posts;
};

export const getLatestPostsData = async (databaseId) => {
  const database = await getDatabase(databaseId);

  const postsPromises = database.slice(0, 3).map((post) => getMetadata(post));

  const posts = await Promise.all(postsPromises);

  return posts;
};

const getMetadata = async (post) => {
  const id = post.id;

  const title = post.properties.title.title[0]?.plain_text;

  const slug = slugify(title);

  const description = post.properties.description.rich_text[0]?.plain_text;

  const tags = post.properties.tags.multi_select?.map((tag) => tag.name);

  const date = post.last_edited_time;

  const formattedDate = formatDate(date);

  const stats = await getReadingTime(post.id);

  const pic = post.properties.pic.files[0]?.file.url;

  return {
    id,
    title,
    slug,
    description,
    tags,
    date,
    stats,
    formattedDate,
    pic,
  };
};

const getReadingTime = async (pageId) => {
  const blocks = await getBlocks(pageId);
  const rendered = blocks.map((block) => getPlainText(block));
  const allText = rendered.reduce((prev, current) => (prev += ` ${current}`));

  const stats = readingTime(allText);

  return stats;
};
