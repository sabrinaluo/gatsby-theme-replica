import { Link } from 'gatsby';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { IoIosAdd, IoIosNotificationsOutline } from 'react-icons/io';
import { RiArrowDropDownFill } from 'react-icons/ri';
import styled from 'styled-components';

import useConfig from '../../hooks/useConfig';
import { color } from '../../theme';
import NavList from './NavList';

const StyledSearchBox = styled.div`
  .gsc-control-cse {
    background-color: ${color.gray.dark};
    border: none;
    padding: 0;
  }

  .gsc-search-button {
    display: none;
  }

  .gsc-input-box {
    border: none;
    border-radius: 6px;
    background-color: hsla(0, 0%, 100%, 0.125);
  }

  .gsc-search-box {
    margin-bottom: 0 !important;
  }

  .gsib_a {
    padding-top: 0;
    padding-bottom: 0;
  }

  /* clear text button */
  .gsst_a {
    .gscb_a {
      font-size: 24px;
      color: ${color.gray.light};
    }
    &:hover .gscb_a {
      color: white;
    }
  }

  input.gsc-input {
    color: white;
    font-size: 14px;
    width: 240px !important;
    background: none !important;
    &:focus {
      width: 500px !important;
    }
  }
`;

const NotiDot = styled.div`
  position: absolute;
  z-index: 2;
  width: 14px;
  height: 14px;
  color: var(--color-text-inverse);
  background-image: linear-gradient(#54a3ff, #006eed);
  background-clip: padding-box;
  border: 2px solid ${color.gray.dark};
  border-radius: 50%;
`;
const TopBar: FC = () => {
  const config = useConfig();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleMobileMenu = () => {
    setIsExpanded((state) => !state);
  };

  useEffect(() => {
    if (!config.gcse) return;
    const gcseScriptId = 'gcse';
    if (document.getElementById(gcseScriptId)) return;

    const cx = config.gcse;
    const gcse = document.createElement('script');
    gcse.id = gcseScriptId;
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = `//cse.google.com/cse.js?cx=${cx}`;
    const s = document.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(gcse, s);
  }, []);

  return (
    <div className={`bg-gray-dark p-4 md:py-0 md:px-6`}>
      <div
        className={`w-full flex justify-between md:justify-auto items-center md:h-60px`}
      >
        <div className={`block md:hidden text-white text-3xl`}>
          <AiOutlineMenu onClick={toggleMobileMenu} />
        </div>

        <Link to='/' className={`text-white`}>
          <FaGithub size={32} />
        </Link>

        <div className={`hidden md:flex items-center flex-grow px-4`}>
          {config.gcse ? (
            <StyledSearchBox>
              <div className='gcse-search'></div>
            </StyledSearchBox>
          ) : (
            <input className={`w-64 focus:w-1/2 px-2`} />
          )}
          <NavList
            className={`flex ml-2 text-sm font-semibold`}
            itemClassName={`mx-2 py-4 text-white hover:no-underline hover:text-opacity-75`}
          />
        </div>
        <ul className={`flex items-center text-white font-semibold`}>
          <li className={`relative`}>
            <IoIosNotificationsOutline
              className={`mr-0 md:mr-2 text-2xl md:text-xl`}
            />
            <NotiDot className={`-top-2px left-10px md:left-8px md:-top-4px`} />
          </li>
          <li className={`hidden md:flex mr-2`}>
            <IoIosAdd className={`text-xl relative left-1`} />
            <RiArrowDropDownFill className={`text-xl`} />
          </li>
          <li className={`hidden md:flex -mr-2`}>
            <img src={config.avatar} className={`rounded-full`} width={20} />
            <RiArrowDropDownFill className={`text-xl`} />
          </li>
        </ul>
      </div>

      <NavList
        className={`${
          isExpanded ? 'h-auto' : 'h-0'
        } w-full font-semibold overflow-hidden`}
        itemClassName={`py-2 text-white hover:no-underline block border-t-fade-white15`}
        showAvatar
      />
    </div>
  );
};

export default TopBar;
