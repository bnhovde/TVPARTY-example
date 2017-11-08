/**
*
* Header
*
*
*/

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { H1, H2 } from './../../Primitives/H';

const shakeAnimation = keyframes`
  0% { transform: translate(0); }
  10% { transform: translate(-2px, -2px); }
  20% { transform: translate(2px, -2px) rotate(1deg); }
  30% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, 2px) rotate(-1deg); }
  50% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, -2px); }
  70% { transform: translate(-2px, 2px) rotate(1deg); }
  80% { transform: translate(-2px, -2px) rotate(-1deg); }
  90% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Rotater = styled.div`
  transform: rotate(-4deg);
`;

const Mover = styled.div`
  animation: ${shakeAnimation} 10s ease infinite;
`;

const SmallText = styled.span`
  text-transform: uppercase;
  font-family: 'Permanent Marker', cursive;
`;

const Circle = styled.div`
  background: white;
  border-radius: 50%;
  height: 18vw;
  width: 18vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const CodeText = H1.extend`
  color: #03a9f4;
`;

function HeaderBar(props) {
  const { title = 'game name', gameCode = false, subTitle = 'Hi!' } = props;

  return (
    <Wrapper>
      <Rotater>
        <SmallText>{subTitle}</SmallText>
        <Mover>
          <H1>{title}</H1>
        </Mover>
      </Rotater>
      {gameCode && (
        <Circle>
          <SmallText>Join with code:</SmallText>
          <CodeText>{gameCode}</CodeText>
        </Circle>
      )}
    </Wrapper>
  );
}

HeaderBar.propTypes = {};

export default HeaderBar;
