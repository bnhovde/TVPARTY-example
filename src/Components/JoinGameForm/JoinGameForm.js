import React from 'react';
import styled from 'styled-components';

import variables from './../../constants/variables';

import { H1 } from '../../Primitives/H';
import { Input } from '../../Primitives/Input';
import { Button } from '../../Primitives/Button';
import { Screen } from './../../Primitives/Screen';
import Block from './../../Primitives/Block';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #dedede;
  color: white;
  will-change: top;
  z-index: 5;
`;

function JoinGameForm(props) {
  const { playerName = '', onSubmit, onChange } = props;

  return (
    <Form onSubmit={onSubmit}>
      <Screen>
        <H1>Join the action!</H1>
        <Block top={2}>
          <Input
            required
            placeholder="Enter name"
            value={playerName}
            onChange={({ target }) => {
              onChange('playerName', target.value);
            }}
          />
        </Block>
        <Block top={1}>
          <Button type="submit">Join Game!</Button>
        </Block>
      </Screen>
    </Form>
  );
}

export default JoinGameForm;
