import styled, { css } from 'styled-components';

interface IContainerProps {
  menuIsOpen: boolean;
}

interface IThemeFooter {
  menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
  grid-area: AS;

  background-color: ${(props) => props.theme.colors.secondary};
  padding-left: 20px;
  border-right: 1px solid ${(props) => props.theme.colors.gray};

  position: relative;

  @media (max-width: 600px) {
    padding-left: 20px;
    position: fixed;
    z-index: 2;

    width: 170px;

    height: ${(props) => (props.menuIsOpen ? '100vh' : '70px')};
    overflow: hidden;

    ${(props) =>
      !props.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${(p) => p.theme.colors.gray};
      `};
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 70px;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
  margin-left: 8px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const LogoImg = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;

  margin-top: 50px;
`;

export const MenuItemLink = styled.a`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.info};

  text-decoration: none;
  margin: 8px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 8px;
  }
`;

export const MenuItemButton = styled.button`
  font-size: 16px;
  border: none;
  background: none;

  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.info};

  text-decoration: none;
  margin: 8px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 8px;
  }
`;

export const ToggleMenu = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 4px;
  font-size: 22px;
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  display: none;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ThemeToggleFooter = styled.footer<IThemeFooter>`
  display: none;

  position: absolute;
  bottom: 30px;

  @media (max-width: 470px) {
    display: ${(props) => (props.menuIsOpen ? 'flex' : 'none')};
  }
`;
