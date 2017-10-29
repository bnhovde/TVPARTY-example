import React from 'react';
import styled from 'styled-components';

import settings from '../../utilities/settings';

import { H1 } from '../../Primitives/H';
import { Input } from '../../Primitives/Input';
import { Button } from '../../Primitives/Button';

const { colors } = settings;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.primary};
  color: white;
  will-change: top;
  z-index: 5;
`;

function JoinGameForm(props) {
  const { roomCode = '', userName = '', onSubmit, onChange } = props;

  return (
    <Form onSubmit={onSubmit}>
      <H1 large color="white">
        Join a game
      </H1>
      <div>
        <Input
          required
          placeholder="Enter room code"
          value={roomCode}
          onChange={({ target }) => {
            onChange('roomCode', target.value);
          }}
        />
      </div>
      <div>
        <Input
          required
          placeholder="Enter name"
          value={userName}
          onChange={({ target }) => {
            onChange('userName', target.value);
          }}
        />
      </div>
      <Button type="submit">Lagre</Button>
    </Form>
  );
}

export default JoinGameForm;
