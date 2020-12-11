import React from 'react';

import { Container, ToggleLabel, ToggleSwitch } from './styles';

interface IToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

const Toggle: React.FC<IToggleProps> = ({
  labelLeft,
  labelRight,
  checked,
  onChange,
}) => (
  <Container>
    <ToggleLabel>{labelLeft}</ToggleLabel>
    <ToggleSwitch
      checked={checked}
      onChange={onChange}
      uncheckedIcon={false}
      checkedIcon={false}
    />
    <ToggleLabel>{labelRight}</ToggleLabel>
  </Container>
);

export default Toggle;
