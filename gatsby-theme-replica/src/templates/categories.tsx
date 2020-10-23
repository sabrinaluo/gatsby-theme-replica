import { Link, graphql } from 'gatsby';
import React, { FC, useMemo } from 'react';

import Layout, { LayoutMode } from '../components/Layout';
import { CATEGORY_DIR, UNCATEGORIZED } from '../constants/key';
import { slugify } from '../utils/slugify';

export const query = graphql`
  query CategoryListQuery {
    allMdx(filter: { slug: { ne: "README" } }) {
      nodes {
        frontmatter {
          category
        }
      }
    }
  }
`;

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: {
          category: string;
        };
      }[];
    };
  };
}

const CategoriesTemplate: FC<Props> = ({ data }) => {
  // todo allow sort by alphabet & count
  const categories = useMemo(
    () =>
      Object.entries(
        data.allMdx.nodes.reduce<Record<string, number>>((acc, posts) => {
          const category = posts.frontmatter.category || UNCATEGORIZED;
          const count = acc[category] || 0;
          acc[category] = count + 1;
          return acc;
        }, {})
      ),
    []
  );

  return (
    <Layout mode={LayoutMode.NavTab}>
      <ul>
        {categories.map(([category, count]) => (
          <li key={category}>
            <Link to={`/${CATEGORY_DIR}/${slugify(category)}`}>
              {category} ({count})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default CategoriesTemplate;
