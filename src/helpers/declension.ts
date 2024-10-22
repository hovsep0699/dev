/** склонение слов */

/** Склонение дня */
export const dayDeclension = (day: number) => {
  // 1 - день
  // 2 - дня
  // 3 - дня
  // 4 - дня
  // 5 - дней
  // 6 - дней
  // 7 - дней
  // 8 - дней
  // 9 - дней
  // 10  дней
  // 11  дней
  // ...
  // 21 день
  // ...дня
  // 25 дней
  // 31 день
  if (day > 10 && day < 19) {
    return `${day} дней`;
  }

  const lastSymbol = day
    .toString()
    .split('')
    .pop();
  const lastNum = Number(lastSymbol);

  if (lastNum === 0) {
    return `${day} дней`;
  }

  if (lastNum === 1) {
    return `${day} день`;
  }

  if (lastNum >= 2 && lastNum <= 4) {
    return `${day} дня`;
  }

  if (lastNum >= 5 && lastNum <= 9) {
    return `${day} дней`;
  }
};

/** склонение месяцев 1 - 12 */
export const monthDeclension = (month: number) => {
  // 1 - месяц
  // 2 - месяца
  // 3 - месяца
  // 4 - месяца
  // 5 - месяцев
  // 6 - месяцев
  // 7 - месяцев
  // 8 - месяцев
  // 9 - месяцев
  // 10  месяцев
  // 11  месяцев
  // 12  месяцев
  if (month === 1) {
    return `${month} месяц`;
  }
  if (month >= 2 && month <= 4) {
    return `${month} месяца`;
  }
  if (month >= 5 && month <= 12) {
    return `${month} месяцев`;
  }
};

/** Склонение года */
export const yearDeclension = (year: number) => {
  // 1 - год
  // 2 - года
  // 3 - года
  // 4 - года
  // 5 - лет
  // 6 - лет
  // 7 - лет
  // 8 - лет
  // 9 - лет
  // 10  лет
  // 11  лет
  // ...
  // 21 год
  // ...года
  // 25 лет
  // 31 год
  if (year > 10 && year < 19) {
    return `${year} лет`;
  }

  const lastSymbol = year
    .toString()
    .split('')
    .pop();
  const lastNum = Number(lastSymbol);

  if (lastNum === 0) {
    return `${year} лет`;
  }

  if (lastNum === 1) {
    return `${year} год`;
  }

  if (lastNum >= 2 && lastNum <= 4) {
    return `${year} года`;
  }

  if (lastNum >= 5 && lastNum <= 9) {
    return `${year} лет`;
  }
};
