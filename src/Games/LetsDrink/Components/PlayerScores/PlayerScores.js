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

const Card = styled.div`
  margin-bottom: 2vh;
  transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  transform-origin: left center;
  transform: scale(${props => (props.active ? '2' : '1')});
`;

const Indicator = styled.span`
  display: block;
  position: absolute;
  left: -20px;
  width: 15px;
  top: 50%;
  font-family: 'Permanent Marker', cursive;
  transform: translateY(-50%);
`;

const ScoreText = styled.span`
  display: inline-block;
  font-family: 'Permanent Marker', cursive;
  margin-left: 10px;
`;

function PlayerScores(props) {
  const { players = {}, playersTurn } = props;
  return (
    <Wrapper>
      <List>
        {Object.keys(players)
          .filter(p => !players[p].inactive)
          .map(p => (
            <Card key={p} active={playersTurn === p}>
              {playersTurn === p && <Indicator>&gt;</Indicator>}
              <TextBold>{players[p].name}</TextBold>
              <ScoreText> ({players[p].points || 0})</ScoreText>
            </Card>
          ))}
      </List>
    </Wrapper>
  );
}

export default PlayerScores;
