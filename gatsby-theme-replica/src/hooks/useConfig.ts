import { graphql, useStaticQuery } from 'gatsby';

interface SiteConfig {
  pathPrefix: string;
  title: string;
  siteUrl: string;
  siteName: string;
  description: string;
  author: string;
  bio: string;
  location: string;
  email: string;
  link: string;
  avatar: string;
  status: {
    emoji: string;
    text: string;
    isBusy: boolean;
  };
  flagCounter: {
    url: string;
    image: string;
  };
  gcse: string;
  footerList: {
    text: string;
    link: string;
  }[];
}

// todo gql schema, allow nullish
const useSiteMetadata = () =>
  useStaticQuery(graphql`
    query SiteConfig {
      site {
        pathPrefix
        siteMetadata {
          title
          description
          siteUrl
          siteName
          author
          bio
          location
          email
          link
          avatar
          gcse
          status {
            emoji
            text
            isBusy
          }
          footerList {
            link
            text
          }
          flagCounter {
            image
            url
          }
        }
      }
    }
  `);

export const useConfig = () => {
  const { site } = useSiteMetadata();
  return { ...site.siteMetadata, pathPrefix: site.pathPrefix } as Partial<
    SiteConfig
  >;
};

export default useConfig;
