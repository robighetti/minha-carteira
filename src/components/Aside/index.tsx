import React, { useState, useCallback } from 'react';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu,
} from 'react-icons/md';

import Toggle from '../Toggle';
import logo from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  Header,
  Title,
  LogoImg,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToggleMenu,
  ThemeToggleFooter,
} from './styles';

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [menuToggleIsOpened, setMenuToggleIsOpened] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark');

  const handleToggleMennu = useCallback(() => {
    setMenuToggleIsOpened(!menuToggleIsOpened);
  }, [menuToggleIsOpened]);

  const handleChangeTheme = useCallback(() => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }, [darkTheme, toggleTheme]);

  return (
    <Container menuIsOpen={menuToggleIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMennu}>
          {menuToggleIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>

        <LogoImg src={logo} alt="Minha Carteira" />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
          <MdDashboard />
          Dashboard
        </MenuItemLink>

        <MenuItemLink href="/list/entry-balance">
          <MdArrowUpward />
          Entradas
        </MenuItemLink>

        <MenuItemLink href="/list/exit-balance">
          <MdArrowDownward />
          Saídas
        </MenuItemLink>

        <MenuItemButton onClick={() => signOut()}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
      <ThemeToggleFooter menuIsOpen={menuToggleIsOpened}>
        <Toggle
          labelLeft="Light"
          labelRight="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
