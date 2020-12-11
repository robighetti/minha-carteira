import React, { useMemo, useState, useCallback } from 'react';

import emojis from '../../utils/emojis';
import Toogle from '../Toggle';

import { useTheme } from '../../hooks/theme';

import { Container, Profile, Welcome, UserName } from './styles';

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark');

  const emoji = useMemo(() => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }, []);

  const handleChangeTheme = useCallback(() => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }, [darkTheme, toggleTheme]);

  return (
    <Container>
      <Toogle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Rodrigo Bighetti</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
