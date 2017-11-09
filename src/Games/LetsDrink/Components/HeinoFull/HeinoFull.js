/**
*
* Loader
*
*
*/
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div``;

const Heino = styled.img`
  height: 50%;
  position: fixed;
  bottom: 0;
  right: 5%;
`;

function HeinoFull() {
  return (
    <Wrapper>
      <Heino
        src={`${process.env.PUBLIC_URL}/assets/letsDrink/heino-large.svg`}
      />
    </Wrapper>
  );
}

export default HeinoFull;
