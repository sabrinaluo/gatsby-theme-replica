import React, { FC } from 'react';

interface Props {
  title: string;
  numericId: number;
  relativeDate: string;
  timeToRead: number;
}

const ArticleTitle: FC<Props> = ({
  numericId,
  relativeDate,
  timeToRead,
  title,
}) => {
  return (
    <div className={`w-full mb-4`}>
      <h1 className={`text-2xl md:text-3xl mb-2`}>
        {title} <span className={`text-gray-200`}>#{numericId}</span>
      </h1>
      <div className={`text-sm text-gray-main border-b md:mb-4 pb-4`}>
        Posted {relativeDate} · {timeToRead} mins reading
      </div>
    </div>
  );
};

export default ArticleTitle;
