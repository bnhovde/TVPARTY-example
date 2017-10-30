import styled from 'styled-components';

import settings from './../constants/settings';
import media from '../utilities/breakpoints';

const {
  fontSizes,
  colors,
} = settings;

const H1 = styled.h1`
  font-size: ${props => props.large ? fontSizes.h1.large : fontSizes.h1.small};
  text-transform: uppercase;
  letter-spacing: .5px;
  font-weight: 100;
  color: ${props => props.color ? props.color : colors.text};
  margin: 0;
  line-height: 1.4;
  ${media.teen`
    font-size: ${fontSizes.h1.large};
  `}
`;

const H2 = styled.h2`
  font-size: ${fontSizes.h2.small};
  font-weight: 100;
  color: ${colors.textWeak};
  margin: 0;
  line-height: 1.4;
  ${media.teen`
    font-size: ${fontSizes.h2.large};
  `}
`;

export {
  H1,
  H2,
};
