import React from 'react';

import styled from 'styled-components';
// import variables from './../../constants/variables';

// const { colors, fontSizes } = variables;

const Wrapper = styled.div`
  display: block;
`;

function Select(props) {
  const { name, items, selected, onChange } = props;

  return (
    <Wrapper>
      <select
        value={selected}
        onChange={({ target }) => {
          onChange(name, target.value);
        }}
      >
        {items.filter(option => !option.disabled).map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export default Select;
