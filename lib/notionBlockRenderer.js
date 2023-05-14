export const getPlainText = (block) => {
  const { type } = block;
  const value = block[type].rich_text;

  switch (type) {
    case 'paragraph':
      return value.map((item) => item.text.content);
    case 'heading_1':
      return value.map((item) => item.text.content);
    case 'heading_2':
      return value.map((item) => item.text.content);
    case 'heading_3':
      return value.map((item) => item.text.content);
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return value.map((item) => item.text.content);
    case 'code':
      return value.map((item) => item.text.content);
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};

const renderBlock = (block) => {
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

export const renderPage = (content) => {
  return content.map((block) => renderBlock(block));
};
