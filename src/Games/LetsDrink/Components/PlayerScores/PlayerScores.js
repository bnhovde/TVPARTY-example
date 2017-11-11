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
  const { players = {} } = props;
  return (
    <Wrapper>
      <List>
        {Object.keys(players)
          .filter(p => !players[p].inactive)
          .map(p => (
            <div key={p}>
              <TextBold>{players[p].name}</TextBold>
            </div>
          ))}
      </List>
    </Wrapper>
  );
}

export default PlayerScores;
