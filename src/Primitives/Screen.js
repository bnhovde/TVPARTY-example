import styled from 'styled-components';

import variables from './../constants/variables';

const { gutter } = variables;

const Screen = styled.section`
  display: block;
  padding: ${gutter.horizontal}vw;
`;

export default Screen;
