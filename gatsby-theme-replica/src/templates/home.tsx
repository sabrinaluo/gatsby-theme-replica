import { graphql } from 'gatsby';
import React, { FC } from 'react';
import { FaGithub, FaStackOverflow } from 'react-icons/fa';

import Layout, { LayoutMode } from '../components/Layout';
import PostList from '../components/PostList';

export const query = graphql`
  query HomepageQuery {
    allMdx(limit: 6, sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        id
        excerpt(pruneLength: 80)
        frontmatter {
          title
          tags
          category
        }
        fields {
          slug
        }
      }
    }
  }
`;

interface PostNode {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    tags: string[];
    category: string;
  };
  fields: {
    slug: string;
  };
}
interface Props {
  data: {
    allMdx: {
      nodes: PostNode[];
    };
  };
}

const transformPosts = (posts: PostNode[]) =>
  posts.map(({ id, excerpt, frontmatter, fields }) => ({
    id,
    excerpt,
    title: frontmatter.title,
    tagCount: frontmatter.tags.length,
    category: frontmatter.category,
    slug: fields.slug,
  }));

const HomeTemplate: FC<Props> = ({ data }) => {
  const posts = transformPosts(data.allMdx.nodes);
  return (
    <Layout mode={LayoutMode.NavTab}>
      <div className={`page-grid flex flex-wrap md:flex-row`}>
        <div className={`w-full md:w-3/12 md:px-4`}>
          <div className={`flex items-center flex-wrap`}>
            <div className={`w-2/12 md:w-full`}>
              <img
                className={`w-full border rounded-full`}
                src={`https://avatars2.githubusercontent.com/u/5300359?s=460&u=ad93a82d45a91c8f6e70ec438d788c7e873ef6b5&v=4`}
              />
            </div>
            <div className={`w-full`}>
              <div className={`md:text-2xl`}> name</div>
              <div className={`md:text-xl`}> name</div>
            </div>
          </div>
          <div
            className={`bg-yellow-200 px-2 py-1 rounded-md mt-2 border border-yellow-300`}
          >
            icon / status
          </div>
          <div>text 123</div>
          <div className={`flex flex-col`}>
            <div className={``}> button</div>
            <ul className={`order-3 md:order-1`}>
              <li>follower 123</li>
            </ul>
            <ul className={`flex flex-col md:order-2`}>
              <li className={`flex item-center`}>
                <span>icon</span>
                <span> text</span>
              </li>
              <li className={`flex item-center`}>
                <span>icon</span>
                <span> text</span>
              </li>
            </ul>
          </div>
          <div className={`border-t border-b py-4 mt-4`}>
            <div className={`text-bold text-xl`}>Highlights</div>
            <div>* contributor</div>
          </div>
          <div className={`mt-4`}>
            <h3 className={`mb-2`}>organizations</h3>
            <div className={`flex flex-wrap`}>
              <a className={`bg-gray-light rounded-sm hover:text-red-100 mr-1`}>
                <FaStackOverflow size={30} />
              </a>

              <a className={`text-gray-main hover:text-red-100`}>
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
        <div className={`w-full md:w-9/12 md:px-4 pt-6`}>
          <div className={`border rounded-md p-6 w-full`}>123</div>
          <PostList posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default HomeTemplate;
