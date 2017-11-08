import styled, { keyframes } from 'styled-components';

import variables from './../constants/variables';

const { colors, gutter } = variables;

const rainbow = keyframes`
0% {
  background-position: 96% 0%;
}
50% {
  background-position: 5% 100%;
}
100% {
  background-position: 96% 0%;
}
`;

const Screen = styled.section`
  display: block;
  padding: ${gutter.horizontal}vw;
  background: ${colors.primary};
`;

const AnimatedScreen = styled.section`
  display: block;
  padding: ${gutter.horizontal}vw;
  background: linear-gradient(
    223deg,
    #3fa7d6,
    #59cd90,
    #fac05e,
    #f79d84,
    #ee6352
  );
  background-size: 1000% 1000%;

  animation: ${rainbow} 30s ease infinite;
`;

export { Screen, AnimatedScreen };
