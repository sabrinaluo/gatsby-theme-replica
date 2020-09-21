import { Link } from 'gatsby';
import React, { FC } from 'react';
import { AiOutlineMail, AiOutlineTags } from 'react-icons/ai';
import { BiLink } from 'react-icons/bi';
import { FaGithub, FaStackOverflow } from 'react-icons/fa';
import { GrBook, GrLocation } from 'react-icons/gr';
import styled from 'styled-components';

import config from '../../_config';
import Calendar from '../components/Calendar';
import Layout, { LayoutMode } from '../components/Layout';
import PostCardList from '../components/PostCardList';
import ReadMe from '../components/ReadMe';
import { color } from '../theme';

const StyledStatusBar = styled.div`
  width: 38px;
  height: 38px;
  bottom: 0;
  left: 100%;
  margin: 0 0 32px -40px;

  div:first-child {
    padding-left: 2px;
  }
  div:last-child {
    display: none;
  }

  &:hover {
    width: auto;
    div:last-child {
      display: block;
    }
  }
`;
const StyledIconList = styled.ul`
  &.flex-row {
    li:not(:last-child):after {
      content: '·';
      margin: 0 4px;
    }
  }

  > li {
    padding-top: 4px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }

    > a {
      display: flex;
      align-items: center;
      color: ${color.gray.main};
      text-decoration: none;

      strong {
        color: ${color.gray.dark};
        padding-right: 2px;
      }

      &:hover,
      &:hover strong {
        color: ${color.blue.default};
      }
    }
  }
`;

interface Props {
  pageContext: {
    totalPosts: number;
    totalTags: number;
    totalCategories: number;
  };
}
const HomeTemplate: FC<Props> = ({ pageContext }) => {
  const { totalCategories, totalPosts, totalTags } = pageContext;
  return (
    <Layout mode={LayoutMode.NavTab}>
      <div className={`page-grid flex flex-wrap md:flex-row`}>
        <div className={`w-full md:w-3/12 md:px-4`}>
          <div className={`flex items-center flex-wrap mb-6 md:mb-0`}>
            <div
              className={`w-2/12 mr-4 md:mr-0 mt-3px md:w-full md:-mt-8 relative`}
            >
              <img
                className={`w-full border rounded-full md:z-50`}
                src={config.avatar}
              />
              <div className={`relative hidden md:block`}>
                <StyledStatusBar
                  className={`absolute px-2 py-1 rounded-full flex items-center ${
                    config.status?.isBusy
                      ? 'border border-yellow bg-yellow-light'
                      : ''
                  }`}
                >
                  <div>{config.status?.emoji}</div>
                  <div
                    className={`text-blue ml-1 px-1 text-xs whitespace-no-wrap`}
                  >
                    {config.status?.text}
                  </div>
                </StyledStatusBar>
              </div>
            </div>
            <div className={`w-auto md:w-full md:py-4`}>
              <div className={`text-26px font-semibold leading-tight`}>
                {' '}
                {config.siteName}
              </div>
              <div className={`text-lg text-gray-main font-light`}>
                {' '}
                {config.author}
              </div>
            </div>
          </div>
          <div
            className={`md:hidden text-xs px-2 py-1 rounded-md my-2 ${
              config.status?.isBusy
                ? 'border border-yellow bg-yellow-light'
                : ''
            }`}
          >
            {config.status?.emoji} {config.status?.text}
          </div>
          <div className={`w-full mb-4`}> {config.bio}</div>

          <div className={`flex flex-col text-sm`}>
            <StyledIconList className={`flex flex-row order-1`}>
              <li>
                <Link to={`/archives`}>
                  <GrBook />
                  <strong>{totalPosts}</strong> posts
                </Link>
              </li>
              <li>
                <Link to={'/categories'}>
                  <strong>{totalCategories}</strong> categories
                </Link>
              </li>
              <li>
                <Link to={`/tags`}>
                  <AiOutlineTags />
                  <strong>{totalTags}</strong>
                </Link>
              </li>
            </StyledIconList>

            <StyledIconList className={`flex flex-col md:order-1`}>
              <li>
                <GrLocation />
                <div>location</div>
              </li>
              <li>
                <AiOutlineMail />
                <div>email</div>
              </li>
              <li>
                <BiLink />
                <div>link</div>
              </li>
            </StyledIconList>
          </div>
          <div className={`border-t border-b py-4 mt-4`}>
            <div className={`font-semibold`}>Highlights</div>
            <div>* contributor</div>
          </div>
          <div className={`mt-4`}>
            <div className={`mb-2 font-semibold`}>Social Media</div>
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
