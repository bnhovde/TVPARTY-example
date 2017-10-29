/**
*
* Loader
*
*
*/
import React from 'react';
import styled, { keyframes } from 'styled-components';
import settings from '../../utilities/settings';

const { colors } = settings;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 5;
`;

const WrapperInner = styled.div`
  position: relative;
  text-align: center;
  overflow: hidden;
`;

const move = keyframes`
  from {
    transform: translate(0px, 0px);
  }

  to {
    transform: translate(0px, 170px);
  }
`;

const Liquid = styled.div`
  position: absolute;
  top: -90px;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: ${colors.primary};
  border-radius: 0 0 50% 50%;
  z-index: -2;
  animation: ${move} ease-out 2s;
  animation-iteration-count: infinite;
`;

const Topper = styled.div`
  position: absolute;
  top: -90px;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  z-index: -1;
  animation: ${move} ease-in-out 2s 0.55s;
  animation-iteration-count: infinite;
`;

const Text = styled.div`
  font-weight: 400;
  letter-spacing: 1px;
`;

function Loader(props) {
  const { text = 'laster..' } = props;

  return (
    <Wrapper>
      <WrapperInner>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <title>Food filter logo</title>
          <path
            d="m81 0l-63 0 -18 0 0 16 0 84 10 0 8 0 25 0 4 0 5 0 8 0 20 0 9 0 11 0 0-80 0-20 -19 0zm-21 48l-4 26 -10.8 10.8 -4.2-35.8 -23-23 0-9.3 62.8 2.5 -0.1 8 -20.7 20.8z"
            fill="#FFF"
          />
          <path
            d="m19.4 17.6l59.7 2.4 0.1 6.9 -20.1 20.2 -4.2 26.3 -8.7 8.7 -3.7-34 -23-23 0-7.5m-0.1-2.5c-0.6 0-1.3 0.2-1.7 0.7 -0.5 0.5-0.8 1.1-0.8 1.8l0 7.5c0 0.7 0.3 1.3 0.7 1.8l22.4 22.4 3.6 33.1c0.1 1 0.7 1.8 1.7 2.1 0.3 0.1 0.6 0.1 0.8 0.1 0.7 0 1.3-0.3 1.8-0.7l8.7-8.7c0.4-0.4 0.6-0.9 0.7-1.4l4.1-25.5 19.6-19.6c0.5-0.5 0.7-1.1 0.7-1.8l-0.1-6.9c0-1.3-1.1-2.4-2.4-2.5l-59.8-2.4c0.1 0 0 0 0 0l0 0z"
            fill="#2B2B2B"
          />
        </svg>
        <Liquid />
        <Topper />
      </WrapperInner>

      <Text>{text}</Text>
    </Wrapper>
  );
}

export default Loader;
