import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import githubTheme from 'prism-react-renderer/themes/github';
import React from 'react';

import Gist from '../src/components/plugin/Gist';
import JsFiddle from '../src/components/plugin/JsFiddle';
import getHeadingInnerText from '../src/utils/getHeadingInnerText';
import { slugify } from '../src/utils/slugify';

const getHeadingWithId = () => {
  return new Array(6).fill(0).reduce((acc, _, index) => {
    const Comp = `h${index + 1}`;
    return {
      ...acc,
      [Comp]: (props) => {
        return (
          <Comp id={slugify(getHeadingInnerText(props.children))} {...props} />
        );
      },
    };
  }, {});
};

const component = {
  ...getHeadingWithId(),
  a: ({ children, ...props }) => {
    if (/https?:\/\/jsfiddle\.net\/\w+\/\w+/.test(props.href)) {
      return <JsFiddle src={props.href} />;
    } else if (/https?:\/\/gist\.github\.com/.test(props.href)) {
      return <Gist src={props.href} />;
    }
    return <a {...props}>{children}</a>;
  },
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
          <div className={`relative`}>
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

export default ({ element }) => {
  return <MDXProvider components={component}>{element}</MDXProvider>;
};
