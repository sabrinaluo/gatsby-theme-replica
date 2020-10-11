import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout, { LayoutMode } from '../components/Layout';
import Tag from '../components/Tag';

export const query = graphql`
  query TagListQuery {
    allMdx(filter: { slug: { ne: "README" } }) {
      nodes {
        frontmatter {
          tags
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
          tags: string[];
        };
      }[];
    };
  };
}

const TagsTemplate: FC<Props> = ({ data }) => {
  // todo allow sort by alphabet & count
  // lower case
  const tags = Object.entries(
    data.allMdx.nodes.reduce<Record<string, number>>((acc, posts) => {
      const tags = posts.frontmatter.tags;
      tags?.forEach((tag) => {
        const count = acc[tag] || 0;
        acc[tag] = count + 1;
      });
      return acc;
    }, {})
  );
  return (
    <Layout mode={LayoutMode.NavTab}>
      {tags.map(([tag, count]) => (
        <Tag key={tag} tag={tag} count={count} />
      ))}
    </Layout>
  );
};

export default TagsTemplate;
