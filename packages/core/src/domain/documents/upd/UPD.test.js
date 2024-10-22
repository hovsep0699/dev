import UPD from './UPD';
import CargoFrom from './vo/invoice/CargoFrom';
import ParticipantType from './standard_element/participant/ParticipantType';
import BankDetailsType from './standard_element/bank_details/BankDetailsType';

describe('UPD invoice', () => {
  test('good fields', () => {
    const upd = new UPD();
    upd.createInvoice('номер документа', '17.01.1990', '643');
    expect(upd.invoice.number.value).toBe('номер документа');
    expect(upd.invoice.date.value).toBe('17.01.1990');
    expect(upd.invoice.currencyCode.value).toBe('643');
  });

  test('bad number', () => {
    const upd = new UPD();
    upd.createInvoice('', '17.01.1990');
    expect(upd.invoice.number.error.message).toBe('Невозможно создать НомерСчФ. Формат не верен.');
  });
  test('bad date', () => {
    const upd = new UPD();
    upd.createInvoice('', '');
    expect(upd.invoice.date.error.message).toBe('Невозможно создать ДатаСчФ. Формат не верен.');
  });
  test('no parameters at all', () => {
    const upd = new UPD();
    upd.createInvoice();
    expect(upd.invoice.number.error.message).toBe('Невозможно создать НомерСчФ. Формат не верен.');
    expect(upd.invoice.date.error.message).toBe('Невозможно создать ДатаСчФ. Формат не верен.');
  });
});

describe('UPD invoice cargoFrom', () => {
  test('good cargoFrom', () => {
    const upd = new UPD();
    upd.createInvoice('номер документа', '17.01.1990', '643');
    const bankDetails = new BankDetailsType(
      'название банка',
      'bikномер',
      'кор счет номер'
    );
    const participant = new ParticipantType(
      '213',
      'division name',
      'Полезная информация для участника докуметооборота',
      'Короткое имя участника',
      '1213',
      bankDetails
    );
    upd.invoice.cargoFrom = new CargoFrom(participant);

    const {
      shortName,
      okpo,
      bank,
      division,
      informationForParticipant
    } = upd.invoice.cargoFrom.value;
    expect(shortName.value).toBe('Короткое имя участника');
    expect(shortName.error).toBe(null);
    expect(okpo.value).toBe('213');
    expect(okpo.error).toBe(null);
    expect(division.value).toBe('division name');
    expect(division.error).toBe(null);
    expect(informationForParticipant.value).toBe('Полезная информация для участника докуметооборота');
    expect(informationForParticipant.error).toBe(null);
    expect(bank.accountNumber.value).toBe('1213');
    expect(bank.accountNumber.error).toBe(null);
    expect(bank.bankDetails.name.value).toBe('название банка');
    expect(bank.bankDetails.name.error).toBe(null);
    expect(bank.bankDetails.bik.value).toBe('bikномер');
    expect(bank.bankDetails.bik.error.message).toBe('Невозможно создать БИК. Формат не верен.');
    expect(bank.bankDetails.correspondentAccount.value).toBe('кор счет номер');
    expect(bank.bankDetails.correspondentAccount.error).toBe(null);
  });
});
