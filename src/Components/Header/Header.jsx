/**
*
* Header
*
*
*/

import React from 'react';
import styled from 'styled-components';
import settings from './../../constants/settings';

import { Logo } from '../../Primitives/Logo';

const { colors } = settings;

const Wrapper = styled.header`
  background-color: ${colors.primary};
`;

function Header() {
  return (
    <Wrapper>
      <Container padding={['top-fluid', 'bottom-double']} margin={['left']}>
        <Logo to="/">foodfilter</Logo>
      </Container>
    </Wrapper>
  );
}

Header.propTypes = {};

export default Header;
