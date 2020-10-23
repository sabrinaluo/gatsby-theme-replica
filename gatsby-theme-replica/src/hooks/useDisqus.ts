import { graphql, useStaticQuery } from 'gatsby';

import useConfig from '../hooks/useConfig';

interface UseDisqusArgs {
  date: string;
  title: string;
  slug: string;
}

const useDisqus = ({ date, title, slug }: UseDisqusArgs) => {
  const data = useStaticQuery(graphql`
    query DisqusPlugin {
      allSitePlugin(filter: { name: { eq: "gatsby-plugin-disqus" } }) {
        totalCount
      }
    }
  `);

  const config = useConfig();

  return data.allSitePlugin.totalCount === 1
    ? {
        url: `${config.siteUrl}${slug}`,
        identifier: String(new Date(date).getTime() / 1000),
        title,
      }
    : null;
};

export default useDisqus;
