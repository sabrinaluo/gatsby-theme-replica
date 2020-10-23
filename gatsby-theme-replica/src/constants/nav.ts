import { CATEGORY_DIR, RSS_FILENAME, TAG_DIR } from '../constants/key';

export enum PageKey {
  HOME,
  ARCHIVES,
  CATEGORIES,
  TAGS,
  RSS,
}

export const navTabs = [
  {
    key: PageKey.HOME,
    href: '/',
    text: 'Overview',
  },
  {
    key: PageKey.ARCHIVES,
    countKey: 'post',
    href: '/archives',
    text: 'Archives',
  },
  {
    key: PageKey.CATEGORIES,
    countKey: 'category',
    href: `/${CATEGORY_DIR}`,
    text: 'Categories',
  },
  {
    key: PageKey.TAGS,
    countKey: 'tag',
    href: `/${TAG_DIR}`,
    text: 'Tags',
  },
  {
    key: PageKey.RSS,
    href: `/${RSS_FILENAME}`,
    text: 'RSS',
    openInNewTab: true,
  },
];
