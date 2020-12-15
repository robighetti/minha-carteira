import styled, { keyframes } from 'styled-components';

import { ILegendProps } from '../PieChartBox/styles';

const animate = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }

`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px;

  border-radius: 8px;

  animation: ${animate} 0.8s;
`;

export const ChartContainer = styled.div`
  flex: 1;
  height: 260px;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin-bottom: 16px;
    padding-left: 16px;
  }

  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

export const LegendContainer = styled.ul`
  list-style: none;

  display: flex;
  padding-right: 16px;
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 8px;
  margin-left: 16px;

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

  @media (max-width: 1200px) {
    > div {
      width: 30px;
      height: 30px;
    }
  }
`;
