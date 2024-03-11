import React from 'react';

import '@styles/prismjs/prism-gruvbox-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

type Props = {
  lang: string;
  lineNumbers?: boolean;
  children: React.ReactNode;
};
const Code = ({ lang, lineNumbers, children }: Props) => {
  return (
    <pre
      className={
        lineNumbers ? `language-${lang} line-numbers` : `language-${lang}`
      }
    >
      <code>{children}</code>
    </pre>
  );
};

export default Code;
