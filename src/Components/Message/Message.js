/**
*
* Drawer
*
*
*/
import React from 'react';
import styled from 'styled-components';
import variables from './../../constants/variables';

import { H1 } from '../../Primitives/H';

const { colors } = variables;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  z-index: 10;
  transform: scale(${props => (props.visible ? '1' : '0')});
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.34, 1.95);
`;

function Message(props) {
  const { data } = props;

  return (
    <Wrapper visible={data.visible}>
      <div>
        <H1>{data.message}</H1>
      </div>
    </Wrapper>
  );
}

export default Message;
