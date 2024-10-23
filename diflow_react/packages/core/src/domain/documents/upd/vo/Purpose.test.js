import Purpose from './Purpose';

describe('Purpose валидные значения', () => {
  test('СЧФ value', () => {
    const purpose = new Purpose('СЧФ');
    expect(purpose.value).toBe('СЧФ');
  });
  test('СЧФ title', () => {
    const purpose = new Purpose('СЧФ');
    expect(purpose.title).toBe('счет-фактура');
  });
  test('СЧФДОП value', () => {
    const purpose = new Purpose('СЧФДОП');
    expect(purpose.value).toBe('СЧФДОП');
  });
  test('СЧФДОП title', () => {
    const purpose = new Purpose('СЧФДОП');
    expect(purpose.title).toBe('счет-фактура с дополнительными сведениями');
  });
  test('ДОП value', () => {
    const purpose = new Purpose('ДОП');
    expect(purpose.value).toBe('ДОП');
  });
  test('ДОП title', () => {
    const purpose = new Purpose('ДОП');
    expect(purpose.title).toBe('документ об отгрузке товаров или передаче имущественных прав');
  });
});
describe('Purpose невалидные значения', () => {
  test('ФСЧ', () => {
    expect(new Purpose('ФСЧ').error.message).toBe('Невозможно создать Функцию документа. Значение невалидно.');
  });
  test('ДОПДОП', () => {
    expect(new Purpose('ДОПДОП').error.message).toBe('Невозможно создать Функцию документа. Значение невалидно.');
  });
});
