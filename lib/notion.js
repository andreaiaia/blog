import { Client } from '@notionhq/client';
import slugify from 'slugify';
import readingTime from 'reading-time';
import { formatDate } from './utils/formatDate';
import { renderBlockTexts } from './notionBlockRenderer';

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

export const getLatestPostsData = async (databaseId) => {
  const database = await getDatabase(databaseId);

  const posts = database.slice(0, 3).map((post) => getMetadata(post));

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
  const rendered = blocks.map((block) => renderBlockTexts(block));
  const allText = rendered.reduce((prev, current) => (prev += current));

  return readingTime(allText);
};
