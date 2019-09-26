import normalize from 'normalize.css';
import { createGlobalStyle } from 'styled-components';

import baseStyle from './base.scss';

const Index = createGlobalStyle`
  ${normalize}
  ${baseStyle}
`;

export default Index;
