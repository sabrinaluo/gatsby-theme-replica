import React, { FC } from 'react';
import { VscEllipsis, VscSmiley } from 'react-icons/vsc';
import styled from 'styled-components';

import useConfig from '../../hooks/useConfig';
import { color } from '../../theme';

const StyledBox = styled.div`
  &:before {
    content: ' ';
    width: 10px;
    height: 10px;
    position: absolute;
    border-left: 1px solid ${color.blue.light};
    border-bottom: 1px solid ${color.blue.light};
    background: ${color.blue[100]};
    left: -5px;
    transform: rotate(45deg);
  }
`;

interface Props {
  dateTime: string;
  formattedDate: string;
}

const AuthorBar: FC<Props> = ({ dateTime, formattedDate }) => {
  const config = useConfig();
  return (
    <StyledBox
      className={`hidden md:flex items-center justify-between text-xs relative bg-blue-100 text-gray-main
      border md:border-b-0 rounded-t-md border-blue-light py-2 px-4`}
    >
      <div className={`leading-6`}>
        <img
          src={config.avatar}
          className={`inline md:hidden rounded-full mr-2`}
          width={24}
        />
        <strong>{config.author}</strong> posted on{' '}
        <time dateTime={dateTime} title={dateTime}>
          {formattedDate}
        </time>
      </div>
      <div className={`flex items-center`}>
        <span
          className={`border border-blue-light rounded-full px-2 py-px hidden md:block`}
        >
          <strong>Author</strong>
        </span>
        <VscSmiley size={18} className={`hidden md:block md:mx-4`} />
        <VscEllipsis size={18} />
      </div>
    </StyledBox>
  );
};

export default AuthorBar;
