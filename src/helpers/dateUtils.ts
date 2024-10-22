/** возвращает первый месяц квартала к которому пренадлежит переданный месяц */
function getCurrentQuarterFirstMonth(month: number) {
  if (month <= 3) {
    return 0;
  }
  if (month >= 4 && month <= 7) {
    return 4;
  }
  return 8;
}

/** добавление 0 если число состоит из одной цифры */
function addZero(value: string | number = 0): string {
  const strValue = String(value);
  if (strValue.length === 1) {
    return '0' + strValue;
  }
  return strValue;
}

/** возвращает дату понедельника или ближайшего прошедшего */
function getMondayDay() {
  const day = new Date().getDay();
  const now = new Date().getTime();

  /** миллисекунд в одном дне */
  const msToDay = 24 * 3600 * 1000;

  /** если воскресенье */
  if (day === 0) {
    const mondayDate = new Date(now - msToDay * 6);
    const modnayYear = mondayDate.getFullYear();
    const mondayMonth = mondayDate.getMonth();
    const mondayDay = mondayDate.getDate();

    return `${modnayYear}-${addZero(mondayMonth + 1)}-${addZero(mondayDay)}`;
  }

  /** если понедельник */
  if (day === 1) {
    const mondayDate = new Date(now);
    const modnayYear = mondayDate.getFullYear();
    const mondayMonth = mondayDate.getMonth();
    const mondayDay = mondayDate.getDate();

    return `${modnayYear}-${addZero(mondayMonth + 1)}-${addZero(mondayDay)}`;
  }
  /** вторник-суббота */
  const mondayDate = new Date(now - msToDay * (day - 1));
  const modnayYear = mondayDate.getFullYear();
  const mondayMonth = mondayDate.getMonth();
  const mondayDay = mondayDate.getDate();

  return `${modnayYear}-${addZero(mondayMonth + 1)}-${addZero(mondayDay)}`;
}

export enum Period {
  /** неделя */
  'week',
  /** месяц */
  'month',
  /** квартал */
  'quarter'
}
/** возвращает число начала периода - неделя/месяц/квартал */
export function getPeriodStart(period?: Period) {
  const month = new Date().getMonth(); // месяц начинается с 0
  const year = new Date().getFullYear();

  if (period === Period.week) {
    return getMondayDay();
  }
  if (period === Period.month) {
    return `${year}-${addZero(month + 1)}-01`;
  }
  if (period === Period.quarter) {
    const firstMonth = getCurrentQuarterFirstMonth(month);
    return `${year}-${addZero(firstMonth + 1)}-01`;
  }
  return;
}
