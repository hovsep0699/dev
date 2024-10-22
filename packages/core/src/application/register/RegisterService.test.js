import RegisterService from './RegisterService';
import RegisterRequest from './RegisterRequest';
import DomainCertificate from '../../domain/common/Certificate';
import DiError from '../error/Error';

describe('Register via certificate', () => {
  const req = new RegisterRequest();
  req.certificate = new DomainCertificate({
    SN: 'Второв',
    G: 'Иван Петрович',
    T: 'заместитель руководителя отдела логистики',
    STREET: 'ул. Тверская, 22',
    CN: 'ООО ""Поставщик Товаров и Услуг""',
    OU: '0',
    O: 'ООО ""Поставщик Товаров и Услуг""',
    L: 'Москва',
    S: '77 Москва',
    C: 'RU',
    E: 'goods_for_you@distate.ru',
    INN: '009987109032',
    OGRN: '1127747209032',
    SNILS: '08836009032',
  },
  '08E52A95D0CA1FD999CD6B638A75E815F67BB300',
  '2018-09-03T08:26:00.000Z',
  '2019-12-03T08:36:00.000Z',
  '61118CFB000300000187');

  test('Fail because no network', () => {
    expect.assertions(3);
    const handleCatch = (error) => {
      expect(error).toBeInstanceOf(DiError);
      expect(error.jsError.message).toBe('Network Error');
      expect(error.msgForDeveloper).toBe('Запрос GET /loginString');
    };
    return RegisterService.register(req)
      .catch(handleCatch);
  });
});


describe('Register via ogrn', () => {
  const req = new RegisterRequest({
    ogrn: '123213213',
    email: 'email@email.ru',
    password: '1',
    position: 'programmer',
    surname: 'Rozhin',
    name: 'Alexey',
    patronymic: 'Alexandrovich',
    captcha: '1',
  });

  test('Pass only ogrn', () => {
    expect.assertions(3);

    const handleFailRegister = (error) => {
      expect(error).toBeInstanceOf(DiError);
      expect(error.jsError.message).toBe('Нельзя отправлять запрос на регистрацию, т.к. нет необходимых полей');
      expect(error.msgForDeveloper).toBe('Валидация на стороне клиента прошла(хотя не должна была).');
    };

    return RegisterService.register(new RegisterRequest({ ogrn: '123213213' }))
      .catch(handleFailRegister);
  });

  test('Fail because no network', () => {
    expect.assertions(4);

    const handleFailRegister = (error) => {
      expect(error).toBeInstanceOf(DiError);
      expect(error.jsError.message).toBe('Network Error');
      expect(error.msgForDeveloper).toBe('Запрос /front/employee/registration');
      const symbols = Object.getOwnPropertySymbols(error.jsError.request);
      symbols.forEach((sym) => {
        const desc = String(sym);
        if (desc === 'Symbol(properties)') {
          expect(error.jsError.request[sym].client.uri.path).toBe('/front/employee/registration');
        }
      });
    };

    return RegisterService.register(req)
      .catch(handleFailRegister);
  });
});
