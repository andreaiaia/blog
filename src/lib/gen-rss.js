const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Andrea Fromont',
    site_url: 'https://andreafromont.vercel.app',
    feed_url: 'https://andreafromont.vercel.app/feed.xml',
  });

  const posts = await fs.readdir(path.join(__dirname, '..', '..', 'articles'));

  const regex = new RegExp(/\.mdx$/, 'i');

  await Promise.all(
    posts
      .filter((fileName) => regex.test(fileName))
      .map(async (name) => {
        const content = await fs.readFile(
          path.join(__dirname, '..', '..', 'articles', name)
        );
        const frontmatter = matter(content);

        feed.item({
          title: frontmatter.data.title,
          url: '/posts/' + name.replace(/\.mdx?/, ''),
          date: frontmatter.data.date,
          description: frontmatter.data.description,
          tags: frontmatter.data.tag.split(','),
          author: 'Andrea Fromont',
        });
      })
  );

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
