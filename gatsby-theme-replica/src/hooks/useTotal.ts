import { graphql, useStaticQuery } from 'gatsby';

interface TotalCount {
  post: number;
  tag: number;
  category: number;
}

const useTotal = (): TotalCount => {
  const { posts, tags, categories } = useStaticQuery(graphql`
    query TotalCount {
      posts: allMdx(filter: { slug: { ne: "README" } }) {
        totalCount
      }

      tags: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }

      categories: allMdx {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `);

  return {
    post: posts.totalCount,
    tag: tags.group.length,
    category: categories.group.length,
  };
};

export default useTotal;
