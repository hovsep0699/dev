import * as Yup from 'yup';



  const genderOptions = [
  { label: 'Мужской', value: 1 },
  { label: 'Женский', value: 2 },
 
];


export const citizenshipOptions = [
  { label: 'Российская Федерация', value: 1 },
  // TODO: Add more options
];

export const nationalityOptions = [

  { label: 'Гражданин Российской Федерации', value: 1 },
  { label: 'Иностранный гражданин', value: 2 },
  { label: 'Лицо без гражданства', value: 3 },
];


export const documentCodeOptions = [

  { label: 'Паспорт гражданина Российской Федерации', value: 2 },

]

export const ulAdminOptions = [
    { value: 'IP', label: 'ИП' },
    { value: 'UL', label: 'ЮЛ' },
    { value: 'FL', label: 'ФЛ' },
  ];


  
export const inUlAdminOptions = [
    { value: 'FL', label: 'ФЛ' },
  ];  
 
export const FilealUlAdminOptions = [
    { value: 'FL', label: 'ФЛ' },
  ];    
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'revoked', label: 'Revoked' },
  ];
  const floorOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  
 export const AdminIPFields = [
  {section : 'Доверитель', fields : [
    { name: 'nameIP', label: 'Наименование', type: 'input', required: false, placeholder:'Введите наименование ИП' , title:'Введите строку длиной 1-1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков') },
    { name: 'ogrnIP', label: 'ОГРНИП', type: 'input', required: true,  placeholder:'Введите ОГРНИП' , title:'Введите 15-значный код' , validation: Yup.string().length(15, 'Введите номер длиной 15 знаков').required('Введите 15-значный код')},
    { name: 'inn', label: 'ИНН', type: 'input', required: true, placeholder:'Введите ИНН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков').required('Введите 12-значный код')},
    { name: 'snils', label: 'СНИЛС', type: 'input', required: true, placeholder:'Введите СНИЛС' , title:'Введите 14-значный код' , validation: Yup.string().length(14,'Введите число длиной 14 знаков').required('Введите 14-значный код')},
    { name: 'lastname', label: 'Фамилия', type: 'input', required: true , placeholder:'Введите Фамилию' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков').required('Введите строку длиной 1-200 знаков')},
    { name: 'name', label: 'Имя', type: 'input', required: true , placeholder:'Введите Имя' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков').required('Введите строку длиной 1-200 знаков')},
    { name: 'patronym', label: 'Отчество', type: 'input', required: false , placeholder:'Введите Отчество' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},
    { name: 'gender', label: 'Пол', type: 'select', options: genderOptions, required: false },
    { name: 'nationality', label: 'Наличие гражданства', type: 'select', options: nationalityOptions, required: false },
    { name: 'ERN', label: 'Номер ЕРН', type: 'input', required: false , placeholder:'Введите номер ЕРН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков')},
    { name: 'birthday', label: 'Дата рождения', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy'},
    { name: 'placeoOfBirth', label: 'Место рождения', type: 'input', required: false , placeholder:'Введите место рождения' , title:'Введите строку длиной до 250 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-250 знаков').max(250, 'Введите строку длиной 1-250 знаков')},
    { name: 'citizenship', label: 'Гражданство', type: 'select' ,options: citizenshipOptions , required: false },
  ]},
  {id:'address' , section : 'Сведения об адресе жительства', fields : [
    { name: 'RegionCode', label: 'Код региона', type: 'input', required: false , placeholder:'Введите код региона' , title:'Введите строку длиной 2 знака', validation: Yup.string().length(2,'Введите строку длиной 2 знака')},
    { name: 'Index', label: 'Индекс', type: 'input', required: false , placeholder:'Введите индекс' , title:'Введите строку длиной 6 знаков', validaion: Yup.string().length(6,'Введите строку длиной 6 знаков')},
    { name: 'Province', label: 'Район', type: 'input', required: false ,placeholder:'Введите название района' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'city', label: 'Город', type: 'input', required: false ,placeholder:'Введите город' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'settlement', label: 'Населенный пункт', type: 'input', required: false ,placeholder:'Введите название населенного пункта' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'street', label: 'Улица', type: 'input', required: false ,placeholder:'Введите улицу' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'house', label: 'Дом', type: 'input', required: false ,placeholder:'Введите номер дома' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'block', label: 'Корпус', type: 'input', required: false ,placeholder:'Введите корпус' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'flat', label: 'Офис/квартира', type: 'input', required: false ,placeholder:'Введите номер офиса или квартиры' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'FIASID', label: 'Идентификатор адреса ФИАС', type: 'input', required: false , placeholder:'Введиите идентификатор адреса ФИАС' , title:'Введите число длиной 36 знаков' , validation: Yup.string().length(36,'Введите число длиной 36 знаков')},
    { name: 'FIAS', label: 'ФИАС адрес в РФ', type: 'input', required: false , placeholder:'Введиите ФИАС адрес' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')}, 
  ]},
    {section : 'Контактные данные', fields : [
      { name: 'Phone', label: 'Номер контактного телефона/факс', type: 'input', required: false ,placeholder:'Введите телефон' , title:'Введите строку длиной 1-50 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков')}, 
      { name: 'Email', label: 'Email', type: 'input', required: false ,placeholder:'Введите email' , title:'Введите строку длиной 3-129 знаков' , validation: Yup.string().email('Invalid email').min(3,'Введите строку длиной 3-129 знаков').max(129,'Введите строку длиной 3-129 знаков')}, 
    ]},
    {section : 'Документ подтверждающий полномочия лица', fields : [
      { name: 'PowerDocName', label: 'Наименование документа', type: 'input', required: false ,placeholder:'Введите наименование документа' , title:'Введите строку длиной 1-120 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-120 знаков').max(120, 'Введите строку длиной 1-120 знаков')}, 
      { name: 'PowerDocDate', label: 'Дата выдачи документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy'},
      { name: 'PowerDocIssueName', label: 'Наименование органа выдавшего документ', type: 'input', required: false ,placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
      { name: 'PowerDocSert', label: 'Сведения об удостоверении документа', type: 'input', required: false ,placeholder:'Введите cведения об удостоверении документа' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
    ]},
    {section : 'Документ удостоверяющий личность', fields : [
      { name: 'DocumentTypeCode', label: 'Код вида документа', type: 'select' , options:documentCodeOptions , required: true }, 
      { name: 'DocumentSeriesAndNumber', label: 'Серия и номер документа', type: 'input', required: true  ,placeholder:'Введите серию и номер документа' , title:'Введите строку длиной 1-25 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-25 знаков').max(25, 'Введите строку длиной 1-25 знаков')},
      { name: 'dateofissue', label: 'Дата выдачи документа', type: 'date', required: true, title:'Введите дату в формате dd.mm.yyyy' },
      { name: 'IssuingAuthorityName', label: 'Наименование органа, выдавшего документ', type: 'input', required: false , placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 4000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-4000 знаков').max(4000, 'Введите строку длиной 1-4000 знаков')},
      { name: 'IssuingAuthorityCode', label: 'Код подразделения органа, выдавшего документ', type: 'input', required: false ,placeholder:'Введите код подразделения органа, выдавшего документ' , title:'Введите строку длиной 7 знаков' , validation:Yup.string().length(7,'Введите строку длиной 7 знаков')},
      { name: 'date', label: 'Дата истечения срока действия документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy' },
    ]},
  ];
 export const AdminFlFields = [
    {section : 'Доверитель', fields : [
      { name: 'snils', label: 'СНИЛС', type: 'input', required: true, placeholder:'Введите СНИЛС' , title:'Введите 14-значный код' , validation: Yup.string().length(14,'Введите число длиной 14 знаков')},
      { name: 'inn', label: 'ИНН', type: 'input', required: false, placeholder:'Введите ИНН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков')},
      { name: 'lastname', label: 'Фамилия', type: 'input', required: true , placeholder:'Введите Фамилию' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},
      { name: 'name', label: 'Имя', type: 'input', required: true , placeholder:'Введите Имя' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},
      { name: 'patronym', label: 'Отчество', type: 'input', required: false , placeholder:'Введите Отчество' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},,
      { name: 'jobtitle', label: 'Должность', type: 'input', required: false  ,placeholder:'Введите должность' , title:'Введите строку длиной до 255 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-255 знаков').max(255, 'Введите строку длиной 1-255 знаков')},
      { name: 'gender', label: 'Пол', type: 'select', options: genderOptions, required: false },
      { name: 'nationality', label: 'Наличие гражданства', type: 'select', options: nationalityOptions, required: false },
      { name: 'ERN', label: 'Номер ЕРН', type: 'input', required: false , placeholder:'Введите номер ЕРН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков')},
      { name: 'birthday', label: 'Дата рождения', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy'},
      { name: 'placeoOfBirth', label: 'Место рождения', type: 'input', required: false , placeholder:'Введите место рождения' , title:'Введите строку длиной до 250 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-250 знаков').max(250, 'Введите строку длиной 1-250 знаков')},
      { name: 'citizenship', label: 'Гражданство', type: 'select' ,options: citizenshipOptions , required: false },
    ]},
    {id:'address' , section : 'Сведения об адресе жительства', fields : [
      { name: 'RegionCode', label: 'Код региона', type: 'input', required: false , placeholder:'Введите код региона' , title:'Введите строку длиной 2 знака', validation: Yup.string().length(2,'Введите строку длиной 2 знака')},
      { name: 'Index', label: 'Индекс', type: 'input', required: false , placeholder:'Введите индекс' , title:'Введите строку длиной 6 знаков', validaion: Yup.string().length(6,'Введите строку длиной 6 знаков')},
      { name: 'Province', label: 'Район', type: 'input', required: false ,placeholder:'Введите название района' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'city', label: 'Город', type: 'input', required: false ,placeholder:'Введите город' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'settlement', label: 'Населенный пункт', type: 'input', required: false ,placeholder:'Введите название населенного пункта' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'street', label: 'Улица', type: 'input', required: false ,placeholder:'Введите улицу' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'house', label: 'Дом', type: 'input', required: false ,placeholder:'Введите номер дома' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'block', label: 'Корпус', type: 'input', required: false ,placeholder:'Введите корпус' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'flat', label: 'Офис/квартира', type: 'input', required: false ,placeholder:'Введите номер офиса или квартиры' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'FIASID', label: 'Идентификатор адреса ФИАС', type: 'input', required: false , placeholder:'Введиите идентификатор адреса ФИАС' , title:'Введите число длиной 36 знаков' , validation: Yup.string().length(36,'Введите число длиной 36 знаков')},
      { name: 'FIAS', label: 'ФИАС адрес в РФ', type: 'input', required: false , placeholder:'Введиите ФИАС адрес' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')}, 
    ]},
    {section : 'Контактные данные', fields : [
      { name: 'Phone', label: 'Номер контактного телефона/факс', type: 'input', required: false ,placeholder:'Введите телефон' , title:'Введите строку длиной 1-50 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков')}, 
      { name: 'Email', label: 'Email', type: 'input', required: false ,placeholder:'Введите email' , title:'Введите строку длиной 3-129 знаков' , validation: Yup.string().email('Invalid email').min(3,'Введите строку длиной 3-129 знаков').max(129,'Введите строку длиной 3-129 знаков')}, 
    ]},
    {section : 'Документ подтверждающий полномочия лица', fields : [
      { name: 'PowerDocName', label: 'Наименование документа', type: 'input', required: false ,placeholder:'Введите наименование документа' , title:'Введите строку длиной 1-120 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-120 знаков').max(120, 'Введите строку длиной 1-120 знаков')}, 
      { name: 'PowerDocDate', label: 'Дата выдачи документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy'},
      { name: 'PowerDocIssueName', label: 'Наименование органа выдавшего документ', type: 'input', required: false ,placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
      { name: 'PowerDocSert', label: 'Сведения об удостоверении документа', type: 'input', required: false ,placeholder:'Введите cведения об удостоверении документа' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
    ]},
    {section : 'Документ удостоверяющий личность', fields : [
      { name: 'DocumentTypeCode', label: 'Код вида документа', type: 'select' , options:documentCodeOptions , required: true }, 
      { name: 'DocumentSeriesAndNumber', label: 'Серия и номер документа', type: 'input', required: true  ,placeholder:'Введите серию и номер документа' , title:'Введите строку длиной 1-25 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-25 знаков').max(25, 'Введите строку длиной 1-25 знаков')},
      { name: 'dateofissue', label: 'Дата выдачи документа', type: 'date', required: true, title:'Введите дату в формате dd.mm.yyyy' },
      { name: 'IssuingAuthorityName', label: 'Наименование органа, выдавшего документ', type: 'input', required: false , placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 4000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-4000 знаков').max(4000, 'Введите строку длиной 1-4000 знаков')},
      { name: 'IssuingAuthorityCode', label: 'Код подразделения органа, выдавшего документ', type: 'input', required: false ,placeholder:'Введите код подразделения органа, выдавшего документ' , title:'Введите строку длиной 7 знаков' , validation:Yup.string().length(7,'Введите строку длиной 7 знаков')},
      { name: 'date', label: 'Дата истечения срока действия документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy' },
    ]},
  ];
  

  
  export const AdminUlFields = [
    {section : 'Доверитель', fields : [
      { name: 'companyName', label: 'Наименование компании', type: 'input', required: true, placeholder:'Введите наименование компании' , title:'Введите строку длиной 1-1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000,'Введите строку длиной 1-1000 знаков').required('Введите строку длиной 1-1000 знаков')},
      { name: 'inn', label: 'ИНН', type: 'input', required: true, placeholder:'Введите ИНН' , title:'Введите 10-значный код' , validation: Yup.string().length(10,'Введите число длиной 10 знаков').required('Введите 10-значный код')},
      { name: 'kpp', label: 'КПП', type: 'input', required: true, placeholder:'Введите КПП' , title:'Введите 9-значный Код Причины Постановки на учет' , validation: Yup.string().length(9,'Введите код длиной 9 знаков').required('Введите 9-значный Код Причины Постановки на учет')},
      { name: 'ogrn', label: 'ОГРН', type: 'input', required: true,  placeholder:'Введите ОГРН' , title:'Введите 13-значный код' , validation: Yup.string().length(13, 'Введите код длиной 13 знаков').required('Введите 13-значный код')},
      { name: 'legalDoc', label: 'Наименование учредительного документа', type: 'input', required: false, placeholder:'Введите наименование учредительного документа' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков') },
    ]},
    {id:'address' , section : 'Сведения об адресе', fields : [
      { name: 'RegionCode', label: 'Код региона', type: 'input', required: true , placeholder:'Введите код региона' , title:'Введите строку длиной 2 знака', validation: Yup.string().length(2,'Введите строку длиной 2 знака')},
      { name: 'Index', label: 'Индекс', type: 'input', required: false , placeholder:'Введите индекс' , title:'Введите строку длиной 6 знаков', validaion: Yup.string().length(6,'Введите строку длиной 6 знаков')},
      { name: 'Province', label: 'Район', type: 'input', required: false ,placeholder:'Введите название района' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'city', label: 'Город', type: 'input', required: false ,placeholder:'Введите город' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'settlement', label: 'Населенный пункт', type: 'input', required: false ,placeholder:'Введите название населенного пункта' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'street', label: 'Улица', type: 'input', required: false ,placeholder:'Введите улицу' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'house', label: 'Дом', type: 'input', required: false ,placeholder:'Введите номер дома' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'block', label: 'Корпус', type: 'input', required: false ,placeholder:'Введите корпус' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'flat', label: 'Офис/квартира', type: 'input', required: false ,placeholder:'Введите номер офиса или квартиры' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'FIASID', label: 'Идентификатор адреса ФИАС', type: 'input', required: false , placeholder:'Введиите идентификатор адреса ФИАС' , title:'Введите число длиной 36 знаков' , validation: Yup.string().length(36,'Введите число длиной 36 знаков')},
      { name: 'FIAS', label: 'ФИАС адрес в РФ', type: 'input', required: false , placeholder:'Введиите ФИАС адрес' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')}, 
    ]},
    {section : 'Контактные данные', fields : [
      { name: 'Phone', label: 'Номер контактного телефона/факс', type: 'input', required: false ,placeholder:'Введите телефон' , title:'Введите строку длиной 1-50 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков')}, 
      { name: 'Email', label: 'Email', type: 'input', required: false ,placeholder:'Введите email' , title:'Введите строку длиной 3-129 знаков' , validation: Yup.string().email('Invalid email').min(3,'Введите строку длиной 3-129 знаков').max(129,'Введите строку длиной 3-129 знаков')}, 
    ]},
    {section : 'Документ подтверждающий полномочия лица', fields : [
      { name: 'PowerDocName', label: 'Наименование документа', type: 'input', required: false ,placeholder:'Введите наименование документа' , title:'Введите строку длиной 1-120 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-120 знаков').max(120, 'Введите строку длиной 1-120 знаков')}, 
      { name: 'PowerDocDate', label: 'Дата выдачи документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy'},
      { name: 'PowerDocIssueName', label: 'Наименование органа выдавшего документ', type: 'input', required: false ,placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
      { name: 'PowerDocSert', label: 'Сведения об удостоверении документа', type: 'input', required: false ,placeholder:'Введите cведения об удостоверении документа' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
    ]},
    {section : 'Admin', fields : [
      { name: 'Admin', label: 'Phone', type: 'button', required: false }, 
      
    ]},
  ];
  

  export const AdminInulFLFields = [
    {section : 'Доверитель', fields : [
      { name: 'snils', label: 'СНИЛС', type: 'input', required: false, placeholder:'Введите СНИЛС' , title:'Введите 14-значный код' , validation: Yup.string().length(14,'Введите число длиной 14 знаков')},
      { name: 'inn', label: 'ИНН', type: 'input', required: false, placeholder:'Введите ИНН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков')},
      { name: 'lastname', label: 'Фамилия', type: 'input', required: true , placeholder:'Введите Фамилию' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},
      { name: 'name', label: 'Имя', type: 'input', required: true , placeholder:'Введите Имя' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},
      { name: 'patronym', label: 'Отчество', type: 'input', required: false , placeholder:'Введите Отчество' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},,
      { name: 'jobtitle', label: 'Должность', type: 'input', required: false  ,placeholder:'Введите должность' , title:'Введите строку длиной до 255 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-255 знаков').max(255, 'Введите строку длиной 1-255 знаков')},
      { name: 'gender', label: 'Пол', type: 'select', options: genderOptions, required: false },
      { name: 'nationality', label: 'Наличие гражданства', type: 'select', options: nationalityOptions, required: false },
      { name: 'ERN', label: 'Номер ЕРН', type: 'input', required: false , placeholder:'Введите номер ЕРН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков')},
      { name: 'birthday', label: 'Дата рождения', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy'},
      { name: 'placeoOfBirth', label: 'Место рождения', type: 'input', required: false , placeholder:'Введите место рождения' , title:'Введите строку длиной до 250 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-250 знаков').max(250, 'Введите строку длиной 1-250 знаков')},
      { name: 'citizenship', label: 'Гражданство', type: 'select' ,options: citizenshipOptions , required: false },
    ]},
    {id:'address' , section : 'Сведения об адресе жительства', fields : [
      { name: 'RegionCode', label: 'Код региона', type: 'input', required: false , placeholder:'Введите код региона' , title:'Введите строку длиной 2 знака', validation: Yup.string().length(2,'Введите строку длиной 2 знака')},
      { name: 'Index', label: 'Индекс', type: 'input', required: false , placeholder:'Введите индекс' , title:'Введите строку длиной 6 знаков', validaion: Yup.string().length(6,'Введите строку длиной 6 знаков')},
      { name: 'Province', label: 'Район', type: 'input', required: false ,placeholder:'Введите название района' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'city', label: 'Город', type: 'input', required: false ,placeholder:'Введите город' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'settlement', label: 'Населенный пункт', type: 'input', required: false ,placeholder:'Введите название населенного пункта' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'street', label: 'Улица', type: 'input', required: false ,placeholder:'Введите улицу' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'house', label: 'Дом', type: 'input', required: false ,placeholder:'Введите номер дома' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'block', label: 'Корпус', type: 'input', required: false ,placeholder:'Введите корпус' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'flat', label: 'Офис/квартира', type: 'input', required: false ,placeholder:'Введите номер офиса или квартиры' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'FIASID', label: 'Идентификатор адреса ФИАС', type: 'input', required: false , placeholder:'Введиите идентификатор адреса ФИАС' , title:'Введите число длиной 36 знаков' , validation: Yup.string().length(36,'Введите число длиной 36 знаков')},
      { name: 'FIAS', label: 'ФИАС адрес в РФ', type: 'input', required: false , placeholder:'Введиите ФИАС адрес' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')}, 
    ]},
    {section : 'Контактные данные', fields : [
      { name: 'Phone', label: 'Номер контактного телефона/факс', type: 'input', required: false ,placeholder:'Введите телефон' , title:'Введите строку длиной 1-50 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков')}, 
      { name: 'Email', label: 'Email', type: 'input', required: false ,placeholder:'Введите email' , title:'Введите строку длиной 3-129 знаков' , validation: Yup.string().email('Invalid email').min(3,'Введите строку длиной 3-129 знаков').max(129,'Введите строку длиной 3-129 знаков')}, 
    ]},
    {section : 'Документ подтверждающий полномочия лица', fields : [
      { name: 'PowerDocName', label: 'Наименование документа', type: 'input', required: false ,placeholder:'Введите наименование документа' , title:'Введите строку длиной 1-120 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-120 знаков').max(120, 'Введите строку длиной 1-120 знаков')}, 
      { name: 'PowerDocDate', label: 'Дата выдачи документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy'},
      { name: 'PowerDocIssueName', label: 'Наименование органа выдавшего документ', type: 'input', required: false ,placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
      { name: 'PowerDocSert', label: 'Сведения об удостоверении документа', type: 'input', required: false ,placeholder:'Введите cведения об удостоверении документа' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')},
    ]},
    {section : 'Документ удостоверяющий личность', fields : [
      { name: 'DocumentTypeCode', label: 'Код вида документа', type: 'select' , options:documentCodeOptions , required: true }, 
      { name: 'DocumentSeriesAndNumber', label: 'Серия и номер документа', type: 'input', required: true  ,placeholder:'Введите серию и номер документа' , title:'Введите строку длиной 1-25 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-25 знаков').max(25, 'Введите строку длиной 1-25 знаков')},
      { name: 'dateofissue', label: 'Дата выдачи документа', type: 'date', required: true, title:'Введите дату в формате dd.mm.yyyy' },
      { name: 'IssuingAuthorityName', label: 'Наименование органа, выдавшего документ', type: 'input', required: false , placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 4000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-4000 знаков').max(4000, 'Введите строку длиной 1-4000 знаков')},
      { name: 'IssuingAuthorityCode', label: 'Код подразделения органа, выдавшего документ', type: 'input', required: false ,placeholder:'Введите код подразделения органа, выдавшего документ' , title:'Введите строку длиной 7 знаков' , validation:Yup.string().length(7,'Введите строку длиной 7 знаков')},
      { name: 'date', label: 'Дата истечения срока действия документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy' },
    ]},
  ]