import React from 'react';
import styled from 'styled-components';

import variables from './../../constants/variables';

import { H1 } from '../../Primitives/H';
import { Input } from '../../Primitives/Input';
import { Button } from '../../Primitives/Button';
import Screen from './../../Primitives/Screen';
import Block from './../../Primitives/Block';

const { colors } = variables;

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
  const { roomCode = '', userName = '', onSubmit, onChange } = props;

  return (
    <Form onSubmit={onSubmit}>
      <Screen>
        <H1>Join a game</H1>
        <Block top={2}>
          <Input
            required
            placeholder="Enter room code"
            value={roomCode}
            onChange={({ target }) => {
              onChange('roomCode', target.value);
            }}
          />
        </Block>
        <Block top={0.5}>
          <Input
            required
            placeholder="Enter username"
            value={userName}
            onChange={({ target }) => {
              onChange('userName', target.value);
            }}
          />
        </Block>
        <Block top={1}>
          <Button type="submit">Lagre</Button>
        </Block>
      </Screen>
    </Form>
  );
}

export default JoinGameForm;
