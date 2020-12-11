import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

type IImputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<IImputProps> = ({ ...rest }) => {
  return <Container {...rest} />;
};

export default Input;
