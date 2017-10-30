import styled from 'styled-components';

import settings from './../constants/settings';
import media from '../utilities/breakpoints';

const {
  fontSizes,
  colors,
  gutter,
} = settings;

const TextArea = styled.div`
  font-size: ${fontSizes.text.small};
  font-weight: 100;
  color: ${colors.text};
  margin: 0;
  line-height: 1.4;
  ${media.teen`
    font-size: ${fontSizes.text.large};
  `}
  & > p {
    margin-bottom: ${gutter.fixed / 2}rem;
  }
`;

export {
  TextArea,
};
