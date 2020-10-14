import { graphql, useStaticQuery } from 'gatsby';

import config from '../../_config';

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

  return data.allSitePlugin.totalCount === 1
    ? {
        url: `${config.siteUrl}${slug}`,
        identifier: new Date(date).getTime() / 1000,
        title,
      }
    : null;
};

export default useDisqus;
