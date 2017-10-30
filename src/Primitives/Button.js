import styled from 'styled-components';

import variables from './../constants/variables';

const { colors, fontSizes } = variables;

const Button = styled.button`
  display: block;
  width: 100%;
  line-height: 3rem;
  font-size: ${fontSizes.text.tiny};
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  background-color: ${colors.secondary};
`;

export { Button };
