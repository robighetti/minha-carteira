import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Logo, Form, FormTitle } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha carteira" />
        <h2>Minha Carteira</h2>
      </Logo>

      <Form
        onSubmit={() => {
          console.log('ok');
        }}
      >
        <FormTitle>Entrar</FormTitle>

        <Input required type="email" placeholder="Digite seu email" />
        <Input required type="password" placeholder="Digite sua senha" />

        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
