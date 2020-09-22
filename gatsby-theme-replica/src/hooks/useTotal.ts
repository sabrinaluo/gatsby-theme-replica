import { graphql, useStaticQuery } from 'gatsby';

interface Group {
  group: { fieldValue: number }[];
}
interface TotalCountQuery {
  posts: {
    totalCount: number;
  };
  tags: Group;
  categories: Group;
  yearly: {
    group: {
      year: number;
      totalCount: number;
    }[];
  };
}

interface TotalCount {
  post: number;
  tag: number;
  category: number;
  yearly: Record<number, number>;
}

const useTotal = (): TotalCount => {
  const { posts, tags, categories, yearly } = useStaticQuery<
    TotalCountQuery
  >(graphql`
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

      yearly: allMdx(filter: { slug: { ne: "README" } }) {
        group(field: fields___year) {
          year: fieldValue
          totalCount
        }
      }
    }
  `);

  return {
    post: posts.totalCount,
    tag: tags.group.length,
    category: categories.group.length,
    yearly: yearly.group?.reduce<Record<number, number>>(
      (acc, o) => ({ ...acc, [o.year]: o.totalCount }),
      {}
    ),
  };
};

export default useTotal;
