import AutocompleteService from './AutocompleteService';
import Currency from '../../domain/documents/upd/vo/Currency';
import autocompleteMockMany from '../../mocks/autocomplete/autocomplete_currency_many';
import autocompleteMockOne from '../../mocks/autocomplete/autocomplete_currency_one';
import autocompleteMockZero from '../../mocks/autocomplete/autocomplete_currency_zero';
import DiError from '../error/Error';

describe('handleUserInput', () => {
  test('Пользователь не точно указал значение в autocomplete.', () => {
    try {
      AutocompleteService.handleUserInput(Currency)(autocompleteMockMany);
    } catch (error) {
      expect(error).toBeInstanceOf(DiError);
      expect(error.msgForDeveloper).toBe('currency - Было найдено несколько совпадений. Пользователю необходимо уточнить запрос');
    }
  });
  test('Пользователь неправильно заполнил заполнил autocomplete.', () => {
    try {
      AutocompleteService.handleUserInput(Currency)(autocompleteMockZero);
    } catch (error) {
      expect(error).toBeInstanceOf(DiError);
      expect(error.msgForDeveloper).toBe('currency - Не найдено ни одного совпадения');
    }
  });

  test('Пользователь удачно заполнил autocomplete.', () => {
    const currency = AutocompleteService.handleUserInput(Currency)(autocompleteMockOne);
    expect(currency).toBeInstanceOf(Currency);
    expect(currency.title).toBe('Евро');
  });
});
