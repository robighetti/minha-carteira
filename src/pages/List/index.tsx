import React, { useMemo, useState, useEffect } from 'react';
import { uuid } from 'uuidv4';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formattedCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const { type: movementType } = match.params;

  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedFrequency, setSelectedFrequency] = useState([
    'recorrente',
    'eventual',
  ]);

  const pageDate = useMemo(() => {
    return movementType === 'entry-balance'
      ? {
          title: 'Entradas',
          lineColor: '#f7931b',
          data: gains,
        }
      : {
          title: 'Saídas',
          lineColor: '#e44c4e',
          data: expenses,
        };
  }, [movementType]);

  const years = useMemo(() => {
    const uniqueYears: number[] = [];

    pageDate.data.forEach((item) => {
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
  }, [pageDate.data]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleFrequencyClick = (frequency: string): void => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency,
    );

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);

      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  useEffect(() => {
    const filteredDate = pageDate.data.filter((list) => {
      const date = new Date(list.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(list.frequency)
      );
    });

    const formatedData = filteredDate.map((item) => {
      return {
        id: uuid(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4e14f0' : '#e44c4e',
      };
    });

    setData(formatedData);
  }, [
    data.length,
    pageDate.data,
    monthSelected,
    yearSelected,
    selectedFrequency,
  ]);

  const handleMonthSelected = (month: string): void => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleYearSelected = (year: string): void => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <Container>
      <ContentHeader title={pageDate.title} lineColor={pageDate.lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent
          ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>

        <button
          type="button"
          className={`tag-filter tag-filter-eventual
          ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
