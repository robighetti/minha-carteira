import React, { useMemo } from 'react';
import CountUp from 'react-countup';

import dolar from '../../assets/dollar.svg';
import arrowDown from '../../assets/arrow-down.svg';
import arrowUp from '../../assets/arrow-up.svg';

import { Container } from './styles';

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerlabel: string;
  icon: 'dolar' | 'arrowUp' | 'arrowDown';
  color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerlabel,
  icon,
  color,
}) => {
  const iconSelected = useMemo(() => {
    switch (icon) {
      case 'dolar':
        return dolar;

      case 'arrowUp':
        return arrowUp;

      case 'arrowDown':
        return arrowDown;

      default:
        return null;
    }
  }, [icon]);

  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <strong>R$ </strong>
        <CountUp end={amount} separator="." decimal="," decimals={2} />
      </h1>
      <small>{footerlabel}</small>
      {iconSelected && <img src={iconSelected} alt={title} />}
    </Container>
  );
};

export default WalletBox;
