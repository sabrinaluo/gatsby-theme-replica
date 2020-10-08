import React, { FC } from 'react';
import styled from 'styled-components';
const StyledIframe = styled.iframe`
  width: calc(100% + 16px);
`;
interface Props {
  src: string;
}

const Gist: FC<Props> = ({ src }) => {
  return <StyledIframe src={`${src}.pibb`} height={300} className={`-mx-2`} />;
};

export default Gist;
