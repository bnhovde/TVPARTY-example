import styled from 'styled-components';

import settings from './../constants/settings';

const {
  colors,
} = settings;

const Hr = styled.hr`
  display: block;
  height: 1px;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: ${colors.secondary};
  opacity: 0.3;
`;

export {
  Hr,
};
