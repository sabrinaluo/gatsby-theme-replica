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
    href: '/categories',
    text: 'Categories',
  },
  {
    key: PageKey.TAGS,
    countKey: 'tag',
    href: '/tags',
    text: 'Tags',
  },
  {
    key: PageKey.RSS,
    href: '/rss',
    text: 'RSS',
  },
];
