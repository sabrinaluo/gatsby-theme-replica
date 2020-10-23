import { AiOutlineTags } from 'react-icons/ai';
import { FaRegFolderOpen } from 'react-icons/fa';
import { FiBookOpen } from 'react-icons/fi';
import { GrBook } from 'react-icons/gr';
import { RiRssLine } from 'react-icons/ri';

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
    Icon: FiBookOpen,
  },
  {
    key: PageKey.ARCHIVES,
    countKey: 'post',
    href: '/archives',
    text: 'Archives',
    Icon: GrBook,
  },
  {
    key: PageKey.CATEGORIES,
    countKey: 'category',
    href: `/${CATEGORY_DIR}`,
    text: 'Categories',
    Icon: FaRegFolderOpen,
  },
  {
    key: PageKey.TAGS,
    countKey: 'tag',
    href: `/${TAG_DIR}`,
    text: 'Tags',
    Icon: AiOutlineTags,
  },
  {
    key: PageKey.RSS,
    href: `/${RSS_FILENAME}`,
    text: 'RSS',
    openInNewTab: true,
    Icon: RiRssLine,
  },
];
