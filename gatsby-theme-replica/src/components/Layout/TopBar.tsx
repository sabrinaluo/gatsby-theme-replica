import { Link } from 'gatsby';
import React, { FC } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { IoIosAdd, IoIosNotificationsOutline } from 'react-icons/io';
import { RiArrowDropDownFill } from 'react-icons/ri';

import config from '../../../_config';
import NavList from './NavList';

const TopBar: FC = () => (
  <div
    className={`bg-gray-dark w-full flex px-4 md:px-6 justify-between md:justify-auto items-center h-64px md:h-60px`}
  >
    <div className={`block md:hidden text-white text-3xl`}>
      <AiOutlineMenu />
    </div>

    <Link to='/' className={`text-white`}>
      <FaGithub size={32} />
    </Link>

    <div className={`hidden md:flex items-center flex-grow px-4`}>
      <input className={`w-64 focus:w-1/2`} />
      <NavList
        className={`flex ml-2 text-sm font-semibold`}
        itemClassName={`mx-2 py-4 text-white hover:no-underline hover:text-opacity-75`}
      />
    </div>
    <ul className={`flex items-center text-white font-semibold`}>
      <li>
        <IoIosNotificationsOutline
          className={`mr-0 md:mr-2 text-2xl md:text-xl`}
        />
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
);

export default TopBar;
