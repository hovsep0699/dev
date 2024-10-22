export const dateMask = [
  {
    length: 2,
    regexp: /^[0-9]{1,2}$/
  },
  { fixed: '.' },
  {
    length: 2,
    regexp: /^[0-9]{1,2}$/
  },
  { fixed: '.' },
  {
    length: 4,
    regexp: /^[0-9]{1,4}$/
  }
];

export const phoneMask = [
  { fixed: '(' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'xxx'
  },
  { fixed: ')' },
  { fixed: ' ' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'xxx'
  },
  { fixed: '-' },
  {
    length: 4,
    regexp: /^[0-9]{1,4}$/,
    placeholder: 'xxxx'
  }
];
