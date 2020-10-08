import React, { FC } from 'react';

interface Props {
  src: string;
}

const JsFiddle: FC<Props> = ({ src }) => {
  return (
    <iframe
      src={`${src}`}
      height={300}
      title={src}
      className={`-mx-4 w-screen md:mx-0 md:w-full my-4 border-t`}
    />
  );
};

export default JsFiddle;
