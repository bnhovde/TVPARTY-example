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

const Indicator = styled.img`
  display: block;
  position: absolute;
  left: -20px;
  width: 15px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
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
              {playersTurn === p && (
                <Indicator
                  src={`${process.env.PUBLIC_URL}/assets/letsDrink/arrow.svg`}
                />
              )}
              <TextBold>{players[p].name}</TextBold>
            </Card>
          ))}
      </List>
    </Wrapper>
  );
}

export default PlayerScores;
