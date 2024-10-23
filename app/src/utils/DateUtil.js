import { format, parse } from 'date-fns';

export const ddmmyyyy_hhmmss = timeStr => {
  const date = new Date(timeStr);
  return format(date, 'dd.MM.yyyy HH:mm:ss');
};
export const ddmmyyyy = timeStr => {
  const date = new Date(timeStr);
  return format(date, 'dd.MM.yyyy');
};
export const ddmmyyyyToDate = dateStr => {
  return parse(dateStr, 'dd.MM.yyyy', new Date());
};
