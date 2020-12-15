import styled, { keyframes } from 'styled-components';

export interface ILegendProps {
  color: string;
}

const animate = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }

`;

export const Container = styled.div`
  width: 48%;
  height: 260px;
  margin: 10px 0;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  border-radius: 8px;

  display: flex;

  animation: ${animate} 0.8s;

  @media (max-width: 770px) {
    display: flex;
    width: 100%;
  }
`;

export const SideLeft = styled.aside`
  padding: 30px 20px;

  h2 {
    margin-bottom: 20px;
  }

  @media (max-width: 1345px) {
    padding: 0 16px 8px;
    margin-bottom: 8px;

    h2 {
      margin-top: 16px;
      margin-bottom: 8px;
    }
  }

  @media (max-width: 420px) {
    h2 {
      padding: 16px;
      margin-bottom: 8px;
    }
  }
`;

export const LegendContainer = styled.ul`
  list-style: none;

  max-height: 175px;
  padding-right: 15px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }

  @media (max-width: 1345px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 8px;

  > div {
    background-color: ${(props) => props.color};

    width: 40px;
    height: 40px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 40px;
    text-align: center;
  }

  > span {
    margin-left: 8px;
  }

  @media (max-width: 145px) {
    font-size: 14px;
    margin: 4px 0;

    > div {
      height: 35px;
      width: 35px;
      line-height: 35px;
    }

    > span {
      margin-left: 8px;
    }
  }
`;

export const SideRight = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;

  @media (max-width: 1345px) {
    height: 100%;
  }
`;
