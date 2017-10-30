import styled from 'styled-components';

import settings from './../constants/settings';

const { colors } = settings;

const Button = styled.button`
  display: block;
  width: 100%;
  line-height: 3rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  background-color: ${colors.secondary};
`;

export { Button };
