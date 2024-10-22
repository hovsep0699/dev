import React from 'react';
import { Button, Input } from '@distate/components';
import './style.css';

interface Props {
  /** длина списка */
  listLength?: number;
  /** метод установки смещение во внешнем компоненте */
  setOffset: Function;
  /** элементов на странице */
  limit?: number;
}
export const Pagination = (props: Props) => {
  const LIMIT = 10;
  const { listLength = 0, setOffset, limit = LIMIT } = props;

  const [inputValue, setInputValue] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);

  React.useEffect(() => {
    /** общее число элементов делим на максимальное кол-во элементов для страницы */
    const result = Math.floor(+(listLength - 1) / limit);
    /** кол-во страниц на 1 больше чем результат полученный выше */
    setPageCount(result + 1);
  }, [listLength, limit]);

  React.useEffect(() => {
    /** При изменении инпута, передаем значение в верхней компонент */
    setOffset((inputValue - 1) * limit);
  }, [inputValue, setOffset, limit]);

  /** изменение значения инпута */
  const changeInpuHandler = (value: string) => {
    setInputValue(+value);
    /** если введено больше чем есть страниц, то выводится последняя страница */
    if (+value > pageCount) {
      setInputValue(pageCount);
    }
    /** если значение меньше 1, то выводится первая страница */
    if (+value < 1) {
      setInputValue(1);
    }
  };

  /** нажатие влево */
  const onLeft = () => {
    setInputValue(inputValue - 1);
  };

  /** нажатие врпаво */
  const onRight = () => {
    setInputValue(inputValue + 1);
  };

  return (
    <div className="pagination">
      <Button onClick={onLeft} disabled={inputValue <= 1}>
        {'<'}
      </Button>
      <Input
        value={inputValue || 1}
        width={45}
        onChange={e => changeInpuHandler(e.target.value)}
        contentClassName="pagination-input-wrapper"
      />
      <div className="count-text">из {pageCount || 1}</div>
      <Button onClick={onRight} disabled={inputValue >= pageCount}>
        {'>'}
      </Button>
    </div>
  );
};
