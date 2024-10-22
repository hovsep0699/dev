import { ddmmyyyy_hhmmss, ddmmyyyy } from './DateUtil';

test('ddmmyyyy_hhmmss', () => {
  expect(ddmmyyyy_hhmmss('Tue Dec 03 2019 11:36:00 GMT+0300 (Moscow Standard Time)')).toBe(
    '03.12.2019 11:36:00'
  );
  expect(ddmmyyyy_hhmmss('Tue Dec 03 2019 11:36:34 GMT+0300 (Moscow Standard Time)')).toBe(
    '03.12.2019 11:36:34'
  );
  expect(ddmmyyyy_hhmmss('Tue Jan 15 2018 11:36:34 GMT+0300 (Moscow Standard Time)')).toBe(
    '15.01.2018 11:36:34'
  );
  expect(ddmmyyyy_hhmmss('Thu Oct 03 2019 14:43:28 GMT+0300 (Moscow Standard Time)')).toBe(
    '03.10.2019 14:43:28'
  );
});

test('ddmmyyyy', () => {
  expect(ddmmyyyy('Tue Dec 03 2019 11:36:00 GMT+0300 (Moscow Standard Time)')).toBe('03.12.2019');
  expect(ddmmyyyy('Tue Dec 03 2019 11:36:34 GMT+0300 (Moscow Standard Time)')).toBe('03.12.2019');
  expect(ddmmyyyy('Tue Jan 15 2018 11:36:34 GMT+0300 (Moscow Standard Time)')).toBe('15.01.2018');
  expect(ddmmyyyy('Thu Oct 03 2019 14:43:28 GMT+0300 (Moscow Standard Time)')).toBe('03.10.2019');
});
