import { graphql, useStaticQuery } from 'gatsby';
import { useRef } from 'react';

import { getDatePostsMap } from '../utils/calendar';

const usePostNodes = () =>
  useStaticQuery(graphql`
    query AllPosts {
      posts: allMdx(filter: { slug: { ne: "README" } }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  `);

export const useDatePostsMap = () => {
  const { posts } = usePostNodes();
  const ref = useRef(getDatePostsMap(posts?.nodes));

  return ref.current;
};

export default usePostNodes;
