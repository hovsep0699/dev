import UserAgreement from './UserAgreement';
import mockParameters200 from '../../mocks/200/parameters';

describe('UserAgreement good parameters', () => {
  const agree = () => {};
  const disagree = () => {};
  const userAgreement = new UserAgreement(mockParameters200, agree, disagree);

  test('getter parameters', () => expect(userAgreement.parameters).toBe(mockParameters200));
  test('getter agree', () => expect(userAgreement.agree).toBe(agree));
  test('getter disagree', () => expect(userAgreement.disagree).toBe(disagree));
});

describe('UserAgreement bad creation', () => {
  test('getter agree', () => expect(() => new UserAgreement(mockParameters200)).toThrowError('Необходимо передать agree в конструктор'));
  test('getter disagree', () => expect(() => new UserAgreement(mockParameters200, () => {}, null)).toThrowError('Необходимо передать disagree в конструктор'));
  test('pass undefined parameters to constructor', () => expect(() => new UserAgreement(undefined)).toThrowError('Необходимо передать parameters в конструктор'));
  test('pass {} parameters to constructor', () => expect(() => new UserAgreement({})).toThrowError('Нет поля agreement_url'));
  test('pass {agreement_url: "str"} parameters to constructor', () => expect(() => new UserAgreement({ agreement_url: mockParameters200.agreement_url })).toThrowError('Нет поля register_title'));
  test('pass {agreement_url: "str", register_title: "str"} parameters to constructor', () => expect(() => new UserAgreement({ agreement_url: mockParameters200.agreement_url, register_title: mockParameters200.register_title })).toThrowError('Нет поля register_text_header'));
});
