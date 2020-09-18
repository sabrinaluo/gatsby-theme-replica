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
    href: '/archives',
    text: 'Archives',
  },
  {
    key: PageKey.CATEGORIES,
    href: '/categories',
    text: 'Categories',
  },
  {
    key: PageKey.TAGS,
    href: '/tags',
    text: 'Tags',
  },
  {
    key: PageKey.RSS,
    href: '/rss',
    text: 'RSS',
  },
];
