import React, { useState, useMemo, useCallback } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MensageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import shocked from '../../assets/shocked.svg';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );

  const years = useMemo(() => {
    const uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((aux) => {
      return {
        value: aux,
        label: aux,
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês, você gastou mais do que deveria.',
        footerText:
          'Verifique seus gastos e tente cortar algumas coisas desnecessárias',
        icon: sadImg,
      };
    }

    if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: 'Opss!',
        description: 'Neste mês não há registros de entradas ou saídas!',
        footerText:
          'Parece que você não fez lançamentos no mês e ano selecionado!',
        icon: shocked,
      };
    }

    if (totalBalance === 0) {
      return {
        title: 'Ufaaa!',
        description: 'Neste mês, você gastou exatamente o que ganhou.',
        footerText: 'Tome cuidado! No proximo mês tente poupar seu dinheiro',
        icon: shocked,
      };
    }

    return {
      title: 'Muito bem!',
      description: 'Sua carteira está positiva!',
      footerText: 'Continue assim, considere investir!',
      icon: happyImg,
    };
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const gainsPercent = ((totalGains / total) * 100).toFixed(1);
    const expensesPercent = ((totalExpenses / total) * 100).toFixed(1);

    return [
      {
        name: 'Entradas',
        value: totalExpenses || 0,
        percent: Number(gainsPercent) || 0,
        color: '#f7931b',
      },
      {
        name: 'Saídas',
        value: totalGains || 0,
        percent: Number(expensesPercent) || 0,
        color: '#e44c4e',
      },
    ];
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return listOfMonths
      .map((_, month) => {
        let amountEntry = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch (err) {
              throw new Error(err.message);
            }
          }
        });

        let amountOutput = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch (err) {
              throw new Error(err.message);
            }
          }
        });

        return {
          monthNumber: month,
          month: listOfMonths[month].substr(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected]);

  const relationExpensesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === 'recorrente') {
          amountRecurrent += Number(expense.amount);
          return amountRecurrent;
        }

        amountEventual += Number(expense.amount);
        return amountEventual;
      });

    const total = amountRecurrent + amountEventual;

    return [
      {
        name: 'Recorrente',
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)) || 0,
        color: '#f7931b',
      },
      {
        name: 'Eventual',
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)) || 0,
        color: '#e44c4e',
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === 'recorrente') {
          amountRecurrent += Number(gain.amount);
          return amountRecurrent;
        }

        amountEventual += Number(gain.amount);
        return amountEventual;
      });

    const total = amountRecurrent + amountEventual;

    return [
      {
        name: 'Recorrente',
        amount: amountRecurrent,
        percent: Number(((amountRecurrent / total) * 100).toFixed(1)) || 0,
        color: '#f7931b',
      },
      {
        name: 'Eventual',
        amount: amountEventual,
        percent: Number(((amountEventual / total) * 100).toFixed(1)) || 0,
        color: '#e44c4e',
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (err) {
      throw new Error(err.message);
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (err) {
      throw new Error(err.message);
    }
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931b">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />

        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WalletBox
          title="Saldo"
          amount={totalBalance}
          footerlabel="atualizado com base nas entradas e saidas"
          icon="dolar"
          color="#4e41f0"
        />

        <WalletBox
          title="Entradas"
          amount={totalGains}
          footerlabel="atualizado com base nas entradas e saidas"
          icon="arrowUp"
          color="#f7931b"
        />

        <WalletBox
          title="Saídas"
          amount={totalExpenses}
          footerlabel="atualizado com base nas entradas e saidas"
          icon="arrowDown"
          color="#e44c4e"
        />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartBox data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931b"
          lineColorAmountOutput="#e44c4e"
        />

        <BarChartBox
          title="Saídas"
          data={relationExpensesRecurrentVersusEventual}
        />

        <BarChartBox
          title="Entradas"
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
