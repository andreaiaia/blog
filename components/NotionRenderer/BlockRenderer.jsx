import React from 'react';

export const BlockRenderer = ({ block }) => {
  const { type } = block;
  const value = block[type].rich_text;

  switch (type) {
    case 'paragraph':
      return <p>{value.map((item) => item.plain_text)}</p>;
    case 'heading_1':
      return <h1>{value.map((item) => item.text.content)}</h1>;
    case 'heading_2':
      return <h2>{value.map((item) => item.text.content)}</h2>;
    case 'heading_3':
      return <h3>{value.map((item) => item.text.content)}</h3>;
    case 'code':
      return <code>{value.map((item) => item.text.content)}</code>;
    case 'quote':
      return <blockquote>{value.map((item) => item.text.content)}</blockquote>;
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};

const RenderBlocks = ({ blocks }) => {
  return blocks.map((block) => <BlockRenderer key={block.id} block={block} />);
};

export default RenderBlocks;
