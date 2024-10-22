import { TrackingData } from './tracking';
import { getIncreaseDecrease } from '../../utils';

export type AutoSumma = {
  rows: TrackingData[];
  total: {
    increase: number;
    decrease: number;
  };
};

export const normalizeRows = (rows: TrackingData[]): any[] => {
  return rows.map(row => {
    const { measurementValueChange: value } = row;
    let increase: string | number | null = '0';
    let decrease: string | number | null = '0';

    if (value?.increase === '0' && value.decrease === '0') {
      decrease = null;
    } else if (value?.increase === '0' && value?.decrease !== '0') {
      increase = null;
      decrease = value.decrease;
    } else if (value?.increase !== '0' && value?.decrease === '0') {
      increase = value?.increase;
      decrease = null;
    }

    return {
      ...row,
      measurementValueChange: {
        ...value,
        increase,
        decrease
      }
    };
  });
};

export const getSummary = (val1: string | number, val2: string | number): number => {
  return Number.parseFloat(String(Number(val1) + Number(val2)));
};

export const autoCalculator = (data: TrackingData[]): AutoSumma => {
  const rows = data.map(item => {
    const measurementValueChange = getIncreaseDecrease(item.measurementValueChange);
    return { ...item, measurementValueChange };
  });

  const reducer = (prev: any, item: Record<string, any>) => {
    prev.increase = getSummary(prev.increase, item.measurementValueChange.increase);
    prev.decrease = getSummary(prev.decrease, item.measurementValueChange.decrease);
    return prev;
  };

  const total = rows.reduce(reducer, { increase: 0, decrease: 0 });

  return { rows, total };
};

export const isAutoSumma = (name: string): boolean => {
  const fields = ['measurementValueChange.after'];
  return fields.indexOf(name) !== -1;
};

export const dataToSelect = (data: any[]) => {
  return data.reduce((prev, { code, title }) => {
    prev.push({ value: code, label: title });
    return prev;
  }, []);
};
