import { ReactElement } from 'react';

type Children =
  | string
  | ReactElement[]
  | {
      props: {
        children: Children;
      };
    };

const walk = (children: Children): string => {
  let text = '';

  if (!children) return '';

  if (typeof children !== 'object') {
    return `${text} ${children}`;
  }

  if (Array.isArray(children)) {
    return children.reduce<string>((acc, child) => {
      return acc + walk(child);
    }, '');
  }

  return walk(children.props?.children);
};

const getHeadingInnerText = (children: string | ReactElement[]) => {
  return walk(children);
};

export default getHeadingInnerText;
