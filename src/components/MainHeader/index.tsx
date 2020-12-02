import React, { useMemo } from 'react';

import emojis from '../../utils/emojis';
import Toogle from '../Toggle';

import { Container, Profile, Welcome, UserName } from './styles';

const MainHeader: React.FC = () => {
  const emoji = useMemo(() => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }, []);

  return (
    <Container>
      <Toogle />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Rodrigo Bighetti</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
