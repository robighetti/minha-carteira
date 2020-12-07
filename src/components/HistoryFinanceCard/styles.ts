import styled from 'styled-components';

interface ITagProps {
  color: string;
}

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
