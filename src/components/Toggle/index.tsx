import React from 'react';

import { Container, ToggleLabel, ToggleSwitch } from './styles';

const Toggle: React.FC = () => (
  <Container>
    <ToggleLabel>Light</ToggleLabel>
    <ToggleSwitch
      checked
      onChange={() => {
        console.log('ok');
      }}
      uncheckedIcon={false}
      checkedIcon={false}
    />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
);

export default Toggle;
