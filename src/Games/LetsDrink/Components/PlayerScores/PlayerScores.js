/**
*
* Loader
*
*
*/
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { TextBold } from './../../../../Primitives/Text';
import { H2 } from './../../../../Primitives/H';

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 30%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: space-between;
`;

function PlayerScores(props) {
  return (
    <Wrapper>
      <List>
        <H2>Players</H2>
        {Object.keys(props.players).map(p => (
          <div key={p}>
            <TextBold>{props.players[p].name}</TextBold>
          </div>
        ))}
      </List>
    </Wrapper>
  );
}

export default PlayerScores;
