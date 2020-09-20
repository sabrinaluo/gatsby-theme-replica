import { graphql } from 'gatsby';
import React, { FC } from 'react';
import { FaGithub, FaStackOverflow } from 'react-icons/fa';

import config from '../../_config';
import Calendar from '../components/Calendar';
import Layout, { LayoutMode } from '../components/Layout';
import PostCardList from '../components/PostCardList';
import ReadMe from '../components/ReadMe';

export const query = graphql`
  query HomepageQuery {
    allMdx(
      limit: 6
      sort: { order: DESC, fields: frontmatter___date }
      filter: { slug: { ne: "README" } }
    ) {
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

const HomeTemplate: FC = () => {
  return (
    <Layout mode={LayoutMode.NavTab}>
      <div className={`page-grid flex flex-wrap md:flex-row`}>
        <div className={`w-full md:w-3/12 md:px-4`}>
          <div className={`flex items-center flex-wrap`}>
            <div className={`w-2/12 md:w-full`}>
              <img
                className={`w-full border rounded-full`}
                src={config.avatar}
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
          <ReadMe />
          <PostCardList />
          <Calendar />
        </div>
      </div>
    </Layout>
  );
};

export default HomeTemplate;
