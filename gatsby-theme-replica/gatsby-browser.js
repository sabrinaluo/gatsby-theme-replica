import './src/styles/global.css';

import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import githubTheme from 'prism-react-renderer/themes/github';
import React from 'react';

const component = {
  pre: (props) => {
    const className = props.children.props.className || '';
    const matches = className.match(/language-(?<lang>.*)/);
    const lang =
      matches && matches.groups && matches.groups.lang
        ? matches.groups.lang
        : '';
    return (
      <Highlight
        {...defaultProps}
        theme={githubTheme}
        code={props.children.props.children}
        language={lang}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div class={`relative`}>
            {lang && (
              <div
                className={`absolute text-gray-dark text-xs px-2 py-px right-0 top-0 bg-gray-light rounded-bl-md rounded-tr-md`}
              >
                {lang}
              </div>
            )}
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    );
  },
};

export const wrapPageElement = ({ element }) => {
  return <MDXProvider components={component}>{element}</MDXProvider>;
};
