import styled from 'styled-components';

import variables from './../constants/variables';
import media from '../utilities/breakpoints';

const { fontSizes, colors, gutter } = variables;

const TextBold = styled.span`
  letter-spacing: 0.5px;
  font-family: 'Permanent Marker', cursive;
  font-size: ${fontSizes.h2.large};
  color: white;
`;

export { TextBold };
