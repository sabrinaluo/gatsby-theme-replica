import { Link, graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/Layout';

export const query = graphql`
  query PostListQuery {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        id
        excerpt(pruneLength: 200)
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`;
interface Post {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
  };
  fields: {
    slug: string;
  };
}

interface Props {
  data: {
    allMdx: {
      nodes: Post[];
    };
  };
}

const ArchiveTemplate: FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes;
  return (
    <Layout>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} className={`mb-4`}>
            <Link to={post.fields.slug}>{post.frontmatter.title} </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ArchiveTemplate;
