import styled, { keyframes } from 'styled-components';

interface ITagProps {
  color: string;
}

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

export const Container = styled.li`
  position: relative;
  background-color: ${(props) => props.theme.colors.tertiary};

  list-style: none;
  border-radius: 8px;
  margin: 10px 0;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  animation: ${animate} 0.8s ease;

  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 8px;

    span {
      font-size: 22px;
      font-weight: bold;
    }
  }
`;

export const Tag = styled.div<ITagProps>`
  position: absolute;
  left: 0;

  width: 12px;
  height: 60%;

  background-color: ${(props) => props.color};
`;
