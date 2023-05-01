export const renderBlockTexts = (block) => {
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
