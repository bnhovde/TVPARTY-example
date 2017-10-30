import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styled from 'styled-components';
import variables from './../../constants/variables';
import media from '../../utilities/breakpoints';

const { colors, fontSizes } = variables;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToggleButton = styled(Link)`
  color: ${props => (props.isActive ? colors.primary : colors.secondary)};
  font-size: ${fontSizes.text.large};
  text-transform: uppercase;
  letter-spacing: -0.5px;
  cursor: pointer;
  border-bottom: 1px solid currentColor;
  border-color: ${props => (props.isActive ? 'transparent' : 'currentColor')};
`;

function Toggle(props) {
  const { items, activeItem, handleClick } = props;

  return (
    <Wrapper>
      {items.map(item => (
        <ToggleButton key={item.url} to={item.url}>
          <span>{item.title}</span>
        </ToggleButton>
      ))}
    </Wrapper>
  );
}

Toggle.propTypes = {
  items: PropTypes.array,
  handleClick: PropTypes.func,
  activeItem: PropTypes.number,
};

export default Toggle;
