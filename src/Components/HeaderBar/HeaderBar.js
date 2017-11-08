/**
*
* Header
*
*
*/

import React from 'react';
import styled from 'styled-components';
import { H1, H2 } from './../../Primitives/H';

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SmallText = styled.span`
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const CodeText = H1.extend`
  color: #03a9f4;
`;

function HeaderBar(props) {
  const { title = 'game name', gameCode = 'XXXX' } = props;

  return (
    <Wrapper>
      <div>
        <SmallText>TVPARTY presents</SmallText>
        <H1>{title}</H1>
      </div>
      <div>
        <SmallText>Join with code:</SmallText>
        <CodeText>{gameCode}</CodeText>
      </div>
    </Wrapper>
  );
}

HeaderBar.propTypes = {};

export default HeaderBar;
