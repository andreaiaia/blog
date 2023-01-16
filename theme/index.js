var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/index.js
import React6 from 'react';
import ReactDOMServer2 from 'react-dom/server';
import Head from 'next/head';
import Link4 from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ThemeProvider, useTheme as useTheme2 } from 'next-themes';

// src/meta.js
import React2 from 'react';
import Link from 'next/link';

// src/theme-switch.js
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const toggleTheme = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return /* @__PURE__ */ React.createElement(
    'span',
    {
      'aria-label': 'Toggle Dark Mode',
      className: 'text-current p-2 cursor-pointer ml-3',
      tabIndex: '0',
      onClick: toggleTheme,
      onKeyDown: (e) => {
        if (e.key === 'Enter') toggleTheme();
      },
    },
    mounted && (theme === 'dark' || resolvedTheme === 'dark')
      ? /* @__PURE__ */ React.createElement(
          'svg',
          {
            fill: 'none',
            viewBox: '0 0 24 24',
            width: '24',
            height: '24',
            stroke: 'currentColor',
          },
          /* @__PURE__ */ React.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
          })
        )
      : /* @__PURE__ */ React.createElement(
          'svg',
          {
            fill: 'none',
            viewBox: '0 0 24 24',
            width: '24',
            height: '24',
            stroke: 'currentColor',
          },
          /* @__PURE__ */ React.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
          })
        )
  );
}

// src/meta.js
function Meta({ author, date, tag, back, config }) {
  const authorNode = author ? author : null;
  const dateNode = date
    ? /* @__PURE__ */ React2.createElement(
        'time',
        null,
        new Date(date).toDateString()
      )
    : null;
  const tags = tag ? tag.split(',').map((s) => s.trim()) : [];
  return /* @__PURE__ */ React2.createElement(
    'div',
    {
      className: 'meta-line',
    },
    /* @__PURE__ */ React2.createElement(
      'div',
      {
        className: 'meta',
      },
      authorNode,
      authorNode && dateNode ? ', ' : null,
      dateNode,
      (authorNode || dateNode) && tags.length ? ' \u2022 ' : null,
      tags.map((t) => {
        return /* @__PURE__ */ React2.createElement(
          Link,
          {
            key: t,
            href: '/tags/[tag]',
            as: `/tags/${t}`,
          },
          /* @__PURE__ */ React2.createElement(
            'a',
            {
              className: 'tag',
            },
            t
          )
        );
      })
    ),
    back
      ? /* @__PURE__ */ React2.createElement(
          Link,
          {
            href: back,
          },
          /* @__PURE__ */ React2.createElement(
            'a',
            {
              className: 'meta-back',
            },
            'Back'
          )
        )
      : null,
    config.darkMode && /* @__PURE__ */ React2.createElement(ThemeSwitch, null)
  );
}

// src/mdx-theme.js
import ReactDOMServer from 'react-dom/server';
import { createContext, useContext, useMemo } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Slugger from 'github-slugger';
import Link3 from 'next/link';
import React4 from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
var THEME = {
  plain: {
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['keyword', 'builtin'],
      style: {
        color: '#ff0078',
        fontWeight: 'bold',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#999',
        fontStyle: 'italic',
      },
    },
    {
      types: ['variable', 'language-javascript'],
      style: {
        color: '#0076ff',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#d9931e',
        fontStyle: 'normal',
      },
    },
    {
      types: ['boolean', 'regex'],
      style: {
        color: '#d9931e',
      },
    },
  ],
};
var SluggerContext = createContext();
var HeaderLink = (_a) => {
  var _b = _a,
    { tag: Tag, children } = _b,
    props = __objRest(_b, ['tag', 'children']);
  const slugger = useContext(SluggerContext);
  const slug = slugger.slug(
    ReactDOMServer.renderToStaticMarkup(children) || ''
  );
  return /* @__PURE__ */ React4.createElement(
    Tag,
    __spreadValues({}, props),
    /* @__PURE__ */ React4.createElement('span', {
      className: 'subheading-anchor',
      id: slug,
    }),
    /* @__PURE__ */ React4.createElement(
      'a',
      {
        href: '#' + slug,
        className: 'subheading',
      },
      children,
      /* @__PURE__ */ React4.createElement(
        'span',
        {
          className: 'anchor-icon',
          'aria-hidden': true,
        },
        '#'
      )
    )
  );
};
var H2 = (_a) => {
  var _b = _a,
    { children } = _b,
    props = __objRest(_b, ['children']);
  return /* @__PURE__ */ React4.createElement(
    HeaderLink,
    __spreadValues(
      {
        tag: 'h2',
      },
      props
    ),
    children
  );
};
var H3 = (_a) => {
  var _b = _a,
    { children } = _b,
    props = __objRest(_b, ['children']);
  return /* @__PURE__ */ React4.createElement(
    HeaderLink,
    __spreadValues(
      {
        tag: 'h3',
      },
      props
    ),
    children
  );
};
var H4 = (_a) => {
  var _b = _a,
    { children } = _b,
    props = __objRest(_b, ['children']);
  return /* @__PURE__ */ React4.createElement(
    HeaderLink,
    __spreadValues(
      {
        tag: 'h4',
      },
      props
    ),
    children
  );
};
var H5 = (_a) => {
  var _b = _a,
    { children } = _b,
    props = __objRest(_b, ['children']);
  return /* @__PURE__ */ React4.createElement(
    HeaderLink,
    __spreadValues(
      {
        tag: 'h5',
      },
      props
    ),
    children
  );
};
var H6 = (_a) => {
  var _b = _a,
    { children } = _b,
    props = __objRest(_b, ['children']);
  return /* @__PURE__ */ React4.createElement(
    HeaderLink,
    __spreadValues(
      {
        tag: 'h6',
      },
      props
    ),
    children
  );
};
var A = (_a) => {
  var _b = _a,
    { children } = _b,
    props = __objRest(_b, ['children']);
  const isExternal = props.href && props.href.startsWith('https://');
  if (isExternal) {
    return /* @__PURE__ */ React4.createElement(
      'a',
      __spreadValues(
        {
          target: '_blank',
          rel: 'noreferrer',
        },
        props
      ),
      children
    );
  }
  return /* @__PURE__ */ React4.createElement(
    Link3,
    {
      href: props.href,
    },
    /* @__PURE__ */ React4.createElement(
      'a',
      __spreadValues({}, props),
      children
    )
  );
};
var Code = (_a) => {
  var _b = _a,
    { children, className, highlight } = _b,
    props = __objRest(_b, ['children', 'className', 'highlight']);
  const highlightedRanges = useMemo(() => {
    return highlight
      ? highlight.split(',').map((r) => {
          if (r.includes('-')) {
            return r.split('-');
          }
          return +r;
        })
      : [];
  }, [highlight]);
  if (!className)
    return /* @__PURE__ */ React4.createElement(
      'code',
      __spreadValues({}, props),
      children
    );
  const language = className.replace(/language-/, '');
  return /* @__PURE__ */ React4.createElement(
    Highlight,
    __spreadProps(__spreadValues({}, defaultProps), {
      code: children.trim(),
      language,
      theme: THEME,
    }),
    ({ className: className2, style, tokens, getLineProps, getTokenProps }) =>
      /* @__PURE__ */ React4.createElement(
        'code',
        {
          className: className2,
          style: __spreadValues({}, style),
        },
        tokens.map((line, i) =>
          /* @__PURE__ */ React4.createElement(
            'div',
            __spreadProps(
              __spreadValues(
                {
                  key: i,
                },
                getLineProps({ line, key: i })
              ),
              {
                style: highlightedRanges.some((r) =>
                  Array.isArray(r)
                    ? r[0] <= i + 1 && i + 1 <= r[1]
                    : r === i + 1
                )
                  ? {
                      background: '#cce0f5',
                      margin: '0 -1rem',
                      padding: '0 1rem',
                    }
                  : null,
              }
            ),
            line.map((token, key) =>
              /* @__PURE__ */ React4.createElement(
                'span',
                __spreadValues(
                  {
                    key,
                  },
                  getTokenProps({ token, key })
                )
              )
            )
          )
        )
      )
  );
};
var components = {
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: A,
  code: Code,
};
var mdx_theme_default = ({ children }) => {
  const slugger = new Slugger();
  return /* @__PURE__ */ React4.createElement(
    SluggerContext.Provider,
    {
      value: slugger,
    },
    /* @__PURE__ */ React4.createElement(
      MDXProvider,
      {
        components,
      },
      children
    )
  );
};

// src/utils/traverse.js
function traverse(pageMap, matcher) {
  for (let i = 0; i < pageMap.length; i++) {
    if (matcher(pageMap[i])) {
      return pageMap[i];
    }
  }
  for (let i = 0; i < pageMap.length; i++) {
    if (pageMap[i].children) {
      const matched = traverse(pageMap[i].children, matcher);
      if (matched) {
        return matched;
      }
    }
  }
  return null;
}

// src/utils/get-title.js
import React5 from 'react';
function getTitle(content) {
  if (content.type === 'h1') return [content, []];
  const children = content.props.children;
  const nodes = React5.Children.toArray(children);
  const titleEl = nodes.find((child) => child.type === 'h1');
  return [titleEl || null, nodes.filter((node) => node !== titleEl)];
}

// src/utils/get-tags.js
function getTags(page) {
  if (!page.frontMatter) {
    return [];
  }
  const tags = page.frontMatter.tag || '';
  return tags.split(',').map((s) => s.trim());
}

// src/utils/sort-date.js
var sort_date_default = (a, b) => {
  if (!a.frontMatter || !a.frontMatter.date) return -1;
  if (!b.frontMatter || !b.frontMatter.date) return -1;
  return new Date(a.frontMatter.date) > new Date(b.frontMatter.date) ? -1 : 1;
};

// src/index.js
var ReactCusdis = dynamic(
  () => import('react-cusdis').then((mod) => mod.ReactCusdis),
  { ssr: false }
);
var Layout = ({
  config,
  meta,
  postList,
  back,
  pageTitle,
  titleNode,
  contentNodes,
  comments,
}) => {
  const type = meta.type || 'post';
  return /* @__PURE__ */ React6.createElement(
    React6.Fragment,
    null,
    /* @__PURE__ */ React6.createElement(
      Head,
      null,
      /* @__PURE__ */ React6.createElement(
        'title',
        null,
        pageTitle,
        config.titleSuffix
      ),
      config.head ? config.head({ title, meta }) : null
    ),
    /* @__PURE__ */ React6.createElement(
      'article',
      {
        className: 'container prose prose-sm md:prose dark:prose-dark',
      },
      titleNode || /* @__PURE__ */ React6.createElement('h1', null, pageTitle),
      type === 'post'
        ? /* @__PURE__ */ React6.createElement(
            Meta,
            __spreadProps(__spreadValues({}, meta), {
              back,
              config,
            })
          )
        : null,
      /* @__PURE__ */ React6.createElement(
        mdx_theme_default,
        null,
        contentNodes,
        type === 'post' ? config.postFooter : null,
        type === 'post' ? comments : null
      ),
      postList,
      config.footer
    )
  );
};
var src_default = (opts, _config) => {
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme2();
  const config = Object.assign(
    {
      readMore: 'Read More \u2192',
      titleSuffix: null,
      postFooter: null,
    },
    _config
  );
  let posts = null;
  const type = opts.meta.type || 'post';
  const route = opts.route;
  if (type === 'posts' || type === 'tag' || type === 'page') {
    posts = [];
    traverse(opts.pageMap, (page) => {
      if (page.children) return;
      if (page.name.startsWith('_')) return;
      if (
        type === 'posts' &&
        !page.route.startsWith(route === '/' ? route : route + '/')
      )
        return;
      if (
        type !== 'page' &&
        (!page.frontMatter ||
          !page.frontMatter.type ||
          page.frontMatter.type === 'post')
      ) {
        posts.push(page);
      }
    });
    posts = posts.sort(sort_date_default);
  }
  let back = null;
  if (type !== 'post') {
    back = null;
  } else {
    const parentPages = [];
    traverse(opts.pageMap, (page) => {
      if (
        route !== page.route &&
        (route + '/').startsWith(page.route === '/' ? '/' : page.route + '/')
      ) {
        parentPages.push(page);
      }
    });
    const parentPage = parentPages
      .reverse()
      .find((page) => page.frontMatter && page.frontMatter.type === 'posts');
    if (parentPage) {
      back = parentPage.route;
    }
  }
  return (props) => {
    const { query } = router;
    const tagName = type === 'tag' ? query.tag : null;
    const content = props.children.type();
    const [titleNode, contentNodes] = getTitle(content);
    const pageTitle =
      opts.meta.title ||
      (typeof tagName === 'undefined'
        ? null
        : titleNode
        ? ReactDOMServer2.renderToStaticMarkup(titleNode.props.children)
        : null) ||
      '';
    let comments;
    if (config.cusdis) {
      if (!config.cusdis.appId) {
        console.warn('[cusdis]', '`appId` is required');
      } else {
        comments = /* @__PURE__ */ React6.createElement(ReactCusdis, {
          lang: config.cusdis.lang,
          style: {
            marginTop: '4rem',
          },
          attrs: {
            host: config.cusdis.host || 'https://cusdis.com',
            appId: config.cusdis.appId,
            pageId: router.pathname,
            pageTitle,
            theme:
              theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light',
          },
        });
      }
    }
    const postList = posts
      ? /* @__PURE__ */ React6.createElement(
          'ul',
          null,
          posts.map((post) => {
            if (tagName) {
              const tags = getTags(post);
              if (!tags.includes(tagName)) {
                return null;
              }
            } else if (type === 'tag') {
              return null;
            }
            const postTitle =
              (post.frontMatter ? post.frontMatter.title : null) || post.name;
            const postDate = post.frontMatter
              ? /* @__PURE__ */ React6.createElement(
                  'time',
                  {
                    className: 'post-item-date',
                  },
                  new Date(post.frontMatter.date).toDateString()
                )
              : null;
            const postDescription =
              post.frontMatter && post.frontMatter.description
                ? /* @__PURE__ */ React6.createElement(
                    'p',
                    {
                      className: 'post-item-desc',
                    },
                    post.frontMatter.description,
                    config.readMore
                      ? /* @__PURE__ */ React6.createElement(
                          Link4,
                          {
                            href: post.route,
                          },
                          /* @__PURE__ */ React6.createElement(
                            'a',
                            {
                              className: 'post-item-more',
                            },
                            config.readMore
                          )
                        )
                      : null
                  )
                : null;
            return /* @__PURE__ */ React6.createElement(
              'div',
              {
                key: post.route,
                className: 'post-item',
              },
              /* @__PURE__ */ React6.createElement(
                'h3',
                null,
                /* @__PURE__ */ React6.createElement(
                  Link4,
                  {
                    href: post.route,
                  },
                  /* @__PURE__ */ React6.createElement(
                    'a',
                    {
                      className: 'post-item-title',
                    },
                    postTitle
                  )
                )
              ),
              postDescription,
              postDate
            );
          })
        )
      : null;
    return /* @__PURE__ */ React6.createElement(
      ThemeProvider,
      {
        attribute: 'class',
        defaultTheme: 'system',
        enableSystem: true,
      },
      /* @__PURE__ */ React6.createElement(
        Layout,
        __spreadValues(
          __spreadValues(
            {
              config,
              postList,
              back,
              pageTitle,
              titleNode,
              contentNodes,
              comments,
            },
            opts
          ),
          props
        )
      )
    );
  };
};
export { src_default as default };
