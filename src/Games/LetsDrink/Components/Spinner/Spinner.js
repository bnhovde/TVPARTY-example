/**
*
* Loader
*
*
*/
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 40%;
`;

const Circle = styled.img`
  width: 100%;
`;

function Spinner() {
  return (
    <Wrapper>
      <Circle src={`${process.env.PUBLIC_URL}/assets/letsDrink/wheel.svg`} />
    </Wrapper>
  );
}

export default Spinner;
