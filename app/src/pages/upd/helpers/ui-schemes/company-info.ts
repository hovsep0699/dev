export const uiCompany = ({ titlePopup }: any) => ({
  participant: {
    width: 320,
    placeholder: 'Введите сведения об участнике'
  },

  type: { width: 320, placeholder: '' },
  companyName: { width: 320, placeholder: 'Введите наименование компании' },
  okpoul: { width: 320, placeholder: 'Введите ОКПО' },
  inn: { width: 320, placeholder: 'Введите ИНН' },
  kpp: { width: 320, placeholder: 'Введите КПП' },
  divisionName: { width: 320, placeholder: 'Введите название стурктурного подразделения' },
  informationForParticipant: {
    width: 320,
    placeholder: 'Введите информацию для участника документооборота'
  },

  regionCode: { width: 320, placeholder: 'Введите код региона' },
  postalCode: { width: 320, placeholder: 'Введите индекс' },
  district: { width: 320, placeholder: 'Введите название района' },
  city: { width: 320, placeholder: 'Введите город' },
  settlement: { width: 320, placeholder: 'Введите название населённого пункта' },
  street: { width: 320, placeholder: 'Введите улицу' },
  house: { width: 320, placeholder: 'Введите номер дома' },
  building: { width: 320, placeholder: 'Введите корпус' },
  room: { width: 320, placeholder: 'Введите номер офиса или квартиры' },

  accountNumber: { width: 320, placeholder: 'Введите Номер банковского счета' },

  bankName: { width: 320, placeholder: 'Введите наименование банка' },
  bik: { width: 320, placeholder: 'Введите БИК' },
  correspondentAccount: { width: 320, placeholder: 'Введите корреспондентский счет' },

  phone: { width: 320, placeholder: 'Введите телефон' },
  email: { width: 320, placeholder: 'Введите email' },

  'ui:widget': 'radio',
  'ui:popup': {
    title: titlePopup,
    field: 'participant'
  },
  'ui:group': [
    {
      type: 'section',
      align: 'center',
      fields: ['participant']
    },
    {
      type: 'section',
      title: 'Участник',
      align: 'center',
      fields: [
        'type',
        'companyName',
        'okpoul',
        'inn',
        'kpp',
        'divisionName',
        'informationForParticipant'
      ]
    },
    {
      type: 'section',
      title: 'Сведения об адресе',
      align: 'center',
      fields: [
        'regionCode',
        'postalCode',
        'district',
        'city',
        'settlement',
        'street',
        'house',
        'building',
        'room'
      ]
    },
    {
      type: 'section',
      title: 'Банковские резвизиты',
      align: 'center',
      fields: ['accountNumber']
    },
    {
      type: 'section',
      title: 'Сведения о банке',
      align: 'center',
      fields: ['bankName', 'bik', 'correspondentAccount']
    },
    {
      type: 'section',
      title: 'Контактные данные',
      align: 'center',
      border: false,
      fields: ['phone', 'email']
    }
  ]
});
