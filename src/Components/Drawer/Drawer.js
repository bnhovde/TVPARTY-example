/**
*
* Drawer
*
*
*/
import React from 'react';
import styled from 'styled-components';
import settings from '../../utilities/settings';

const { colors } = settings;

const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.primary};
  color: white;
  z-index: 10;
  transform: translateY(${props => (props.visible ? '0%' : '100%')});
  transition: transform 0.2s ease;
`;

function Drawer(props) {
  const { children, visible } = props;

  return <DrawerWrapper visible={props.visible}>{children}</DrawerWrapper>;
}

export default Drawer;
