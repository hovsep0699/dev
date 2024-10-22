// import { genderOptions } from "../../LegalEntity/LegalEntityPage";
import * as Yup from 'yup';
import { citizenshipOptions, documentCodeOptions, nationalityOptions } from './AdminFormInitialData';
import {PrincipalTypes, PrincipalULAdminTypes} from "../options/types";


const genderOptions = [
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
 
];





export const PrincipaltypeOptions = [
    { value: PrincipalTypes.IP, label: 'ИП' },
    { value: PrincipalTypes.UL, label: 'ЮЛ' },
    { value: PrincipalTypes.INUL, label: 'ИНЮЛ' },
  ];
export const PrincipalULAdminTypeOptions = [
    { value: PrincipalULAdminTypes.IP, label: 'ИП' },
    { value: PrincipalULAdminTypes.UL, label: 'ЮЛ' },
    { value: PrincipalULAdminTypes.FL, label: 'ФЛ' },
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
  
 export const PrincipalIPFields = [
  {section : 'Доверитель', fields : [
    { name: 'nameText', label: 'Наименование', type: 'input', required: false, placeholder:'Введите наименование ИП' , title:'Введите строку длиной 1-1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков') },
    { name: 'ogrn', label: 'ОГРНИП*', type: 'input', required: true,  placeholder:'Введите ОГРНИП' , title:'Введите 15-значный код' , validation: Yup.string().length(15, 'Введите номер длиной 15 знаков').required('Введите 15-значный код')},
    { name: 'inn', label: 'ИНН*', type: 'input', required: true, placeholder:'Введите ИНН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков').required('Введите 12-значный код')},
    { name: 'socialNumber', label: 'СНИЛС*', type: 'input', required: true, placeholder:'Введите СНИЛС' , title:'Введите 14-значный код' , validation: Yup.string().length(14,'Введите число длиной 14 знаков').required('Введите 14-значный код')},
    { name: 'surname', label: 'Фамилия*', type: 'input', required: true , placeholder:'Введите Фамилию' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков').required('Поле обязательно для ввода')},
    { name: 'name', label: 'Имя*', type: 'input', required: true , placeholder:'Введите Имя' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков').required('Поле обязательно для ввода')},
    { name: 'patronymic', label: 'Отчество', type: 'input', required: false , placeholder:'Введите Отчество' , title:'Введите строку длиной до 200 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-200 знаков').max(200, 'Введите строку длиной 1-200 знаков')},,
    { name: 'gender', label: 'Пол', type: 'select', options: genderOptions, required: false },  //ira mot male female tarberaknerrnen
    { name: 'citizenshipMark', label: 'Наличие гражданства', type: 'select', options: nationalityOptions, required: false }, // ira mot russian, foreign, none
    { name: 'ernNumber', label: 'Номер ЕРН', type: 'input', required: false , placeholder:'Введите номер ЕРН' , title:'Введите 12-значный код' , validation: Yup.string().length(12,'Введите число длиной 12 знаков')},
    { name: 'birthday', label: 'Дата рождения', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy', placeholder:'Дата'},
    { name: 'birthPlace', label: 'Место рождения', type: 'input', required: false , placeholder:'Введите место рождения' , title:'Введите строку длиной до 250 знаков', validation: Yup.string().min(1, 'Введите строку длиной 1-250 знаков').max(250, 'Введите строку длиной 1-250 знаков')},
    { name: 'citizenship', label: 'Гражданство', type: 'select' ,options: citizenshipOptions , required: false },
  ]},
  {id:'address' , section : 'Сведения об адресе жительства', fields : [
    { name: 'regionCode', label: 'Код региона', type: 'input', required: false , placeholder:'Введите код региона' , title:'Введите строку длиной 2 знака', validation: Yup.string().length(2,'Введите строку длиной 2 знака')},
    { name: 'Index', label: 'Индекс', type: 'input', required: false , placeholder:'Введите индекс' , title:'Введите строку длиной 6 знаков', validaion: Yup.string().length(6,'Введите строку длиной 6 знаков')},
    { name: 'Province', label: 'Район', type: 'input', required: false ,placeholder:'Введите название района' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'city', label: 'Город', type: 'input', required: false ,placeholder:'Введите город' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'settlement', label: 'Населенный пункт', type: 'input', required: false ,placeholder:'Введите название населенного пункта' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'street', label: 'Улица', type: 'input', required: false ,placeholder:'Введите улицу' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'house', label: 'Дом', type: 'input', required: false ,placeholder:'Введите номер дома' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'block', label: 'Корпус', type: 'input', required: false ,placeholder:'Введите корпус' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'flat', label: 'Офис/квартира', type: 'input', required: false ,placeholder:'Введите номер офиса или квартиры' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
    { name: 'fiasId', label: 'Идентификатор адреса ФИАС', type: 'input', required: false , placeholder:'Введиите идентификатор адреса ФИАС' , title:'Введите число длиной 36 знаков' , validation: Yup.string().length(36,'Введите число длиной 36 знаков')},
    { name: 'fiasText', label: 'ФИАС адрес в РФ', type: 'input', required: false , placeholder:'Введиите ФИАС адрес' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')}, 
  ]},
  {section : 'Контактные данные', fields : [
    { name: 'phone', label: 'Номер контактного телефона/факс', type: 'input', required: false ,placeholder:'Введите телефон' , title:'Введите строку длиной 1-50 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков')}, 
    { name: 'email', label: 'Email', type: 'input', required: false ,placeholder:'Введите email' , title:'Введите строку длиной 3-129 знаков' , validation: Yup.string().email('Invalid email').min(3,'Введите строку длиной 3-129 знаков').max(129,'Введите строку длиной 3-129 знаков')}, 
  ]},
  {section : 'Документ удостоверяющий личность', fields : [
    { name: 'kind', label: 'Код вида документа', type: 'select' , options: documentCodeOptions , required: false },
    { name: 'serialnumber', label: 'Серия и номер документа', type: 'input', required: false  ,placeholder:'Введите серию и номер документа' , title:'Введите строку длиной 1-25 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-25 знаков').max(25, 'Введите строку длиной 1-25 знаков')},
    { name: 'issuedAt', label: 'Дата выдачи документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy', placeholder:'Дата' },
    { name: 'issuer', label: 'Наименование органа, выдавшего документ', type: 'input', required: false , placeholder:'Введите наименование органа, выдавшего документ' , title:'Введите строку длиной до 4000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-4000 знаков').max(4000, 'Введите строку длиной 1-4000 знаков')},
    { name: 'issuerCode', label: 'Код подразделения органа, выдавшего документ', type: 'input', required: false ,placeholder:'Введите код подразделения органа, выдавшего документ' , title:'Введите строку длиной 7 знаков' , validation:Yup.string().length(7,'Введите строку длиной 7 знаков')},
    { name: 'expireAt', label: 'Дата истечения срока действия документа', type: 'date', required: false, title:'Введите дату в формате dd.mm.yyyy', placeholder:'Дата' },
  ]},
  ];

  
// TODO all address section required by default
  export const PrincipalUlFields = [
    {section : 'Доверитель', fields : [
      { name: 'nameText', label: 'Наименование компании*', type: 'input', required: true, placeholder:'Введите наименование компании' , title:'Введите строку длиной 1-1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000,'Введите строку длиной 1-1000 знаков').required('Введите строку длиной 1-1000 знаков')},
      { name: 'inn', label: 'ИНН*', type: 'input', required: true, placeholder:'Введите ИНН' , title:'Введите 10-значный код' , validation: Yup.string().length(10,'Введите число длиной 10 знаков').required('Введите 10-значный код')},
      { name: 'kpp', label: 'КПП*', type: 'input', required: true, placeholder:'Введите КПП' , title:'Введите 9-значный Код Причины Постановки на учет' , validation: Yup.string().length(9,'Введите код длиной 9 знаков').required('Введите 9-значный Код Причины Постановки на учет')},
      { name: 'ogrn', label: 'ОГРН*', type: 'input', required: true,  placeholder:'Введите ОГРН' , title:'Введите 13-значный код' , validation: Yup.string().length(13, 'Введите код длиной 13 знаков').required('Введите 13-значный код')},
      { name: 'constituentDoc', label: 'Наименование учредительного документа', type: 'input', required: false, placeholder:'Введите наименование учредительного документа' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков') },
    ]},
    {id:'address' , section : 'Сведения об адресе', fields : [
      { name: 'regionCode', label: 'Код региона*', type: 'input', required: false , placeholder:'Введите код региона' , title:'Введите строку длиной 2 знака', validation: Yup.string().length(2,'Введите строку длиной 2 знака')},
      { name: 'Index', label: 'Индекс*', type: 'input', required: false , placeholder:'Введите индекс' , title:'Введите строку длиной 6 знаков', validaion: Yup.string().length(6,'Введите строку длиной 6 знаков')},
      { name: 'Province', label: 'Район', type: 'input', required: false ,placeholder:'Введите название района' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'city', label: 'Город*', type: 'input', required: false ,placeholder:'Введите город' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'settlement', label: 'Населенный пункт', type: 'input', required: false ,placeholder:'Введите название населенного пункта' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'street', label: 'Улица*', type: 'input', required: false ,placeholder:'Введите улицу' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'house', label: 'Дом*', type: 'input', required: false ,placeholder:'Введите номер дома' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'block', label: 'Корпус', type: 'input', required: false ,placeholder:'Введите корпус' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'flat', label: 'Офис/квартира*', type: 'input', required: false ,placeholder:'Введите номер офиса или квартиры' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'fiasId', label: 'Идентификатор адреса ФИАС*', type: 'input', required: false , placeholder:'Введиите идентификатор адреса ФИАС' , title:'Введите число длиной 36 знаков' , validation: Yup.string().length(36,'Введите число длиной 36 знаков')},
      { name: 'fiasText', label: 'ФИАС адрес в РФ*', type: 'input', required: false , placeholder:'Введиите ФИАС адрес' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')}, 
    ]},
    {section : 'Контактные данные', fields : [
      { name: 'phone', label: 'Номер контактного телефона/факс', type: 'input', required: false ,placeholder:'Введите телефон' , title:'Введите строку длиной 1-50 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков')}, 
      { name: 'email', label: 'Email', type: 'input', required: false ,placeholder:'Введите email' , title:'Введите строку длиной 3-129 знаков' , validation: Yup.string().email('Invalid email').min(3,'Введите строку длиной 3-129 знаков').max(129,'Введите строку длиной 3-129 знаков')}, 
    ]},
  ];
  
  
  export const PrincipalInulFields = [
    {section : 'Доверитель', fields : [
      { name: 'nameText', label: 'Наименование компании*', type: 'input', required: true, placeholder:'Введите наименование компании' , title:'Введите строку длиной 1-1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000,'Введите строку длиной 1-1000 знаков').required('Поле обязательно для ввода')},
      { name: 'inn', label: 'ИНН', type: 'input', required: false, placeholder:'Введите ИНН' , title:'Введите 10-значный код' , validation: Yup.string().length(10,'Введите число длиной 10 знаков')},
      { name: 'kpp', label: 'КПП', type: 'input', required: false, placeholder:'Введите КПП' , title:'Введите 9-значный Код Причины Постановки на учет' , validation: Yup.string().length(9,'Введите код длиной 9 знаков')},
      { name: 'accreditation', label: 'Номер записи об аккредитации', type: 'input', required: false, placeholder:'Введите номер записи об аккредитации' , title:'Введите число длиной 11 знаков' , validation: Yup.string().length(11,'Введите число длиной 11 знаков') },
      { name: 'country', label: 'Страна регистрации*', type: 'select' ,options: citizenshipOptions , required: true, validation: Yup.string().required('Выберите страну регистрации') },
      { name: 'regAuthorityName', label: 'Наименование регистрирующего органа', type: 'input', required: false, placeholder:'Введите наименование регистрирующего органа' , title:'Введите строку длиной 1-255 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-255 знаков').max(255,'Введите строку длиной 1-255 знаков') },
      { name: 'number', label: 'Регистрационный номер в стране регистрации*', type: 'input', required: true, placeholder:'Введите регистрационный номер' , title:'Введите строку длиной 1-80 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-80 знаков').max(80,'Введите строку длиной 1-80 знаков').required('Поле обязательно для ввода')},
      { name: 'code', label: 'Код налогоплательщика в стране регистрации', type: 'input', required: false, placeholder:'Введите код налогоплательщика' , title:'Введите строку длиной 1-80 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-80 знаков').max(80,'Введите строку длиной 1-80 знаков') },
      { name: 'homeAddress', label: 'Адрес юридического лица в стране регистрации*', type: 'input', required: true, placeholder:'Введите адрес юридического лица в стране регистрации' , title:'Введите строку длиной 1-1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000,'Введите строку длиной 1-1000 знаков').required('Поле обязательно для ввода')},
    ]},
    {id:'address' , section : 'Сведения об адресе', fields : [
      { name: 'regionCode', label: 'Код региона', type: 'input', required: false , placeholder:'Введите код региона' , title:'Введите строку длиной 2 знака', validation: Yup.string().length(2,'Введите строку длиной 2 знака')},
      { name: 'Index', label: 'Индекс', type: 'input', required: false , placeholder:'Введите индекс' , title:'Введите строку длиной 6 знаков', validaion: Yup.string().length(6,'Введите строку длиной 6 знаков')},
      { name: 'Province', label: 'Район', type: 'input', required: false ,placeholder:'Введите название района' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'city', label: 'Город', type: 'input', required: false ,placeholder:'Введите город' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'settlement', label: 'Населенный пункт', type: 'input', required: false ,placeholder:'Введите название населенного пункта' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'street', label: 'Улица', type: 'input', required: false ,placeholder:'Введите улицу' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'house', label: 'Дом', type: 'input', required: false ,placeholder:'Введите номер дома' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'block', label: 'Корпус', type: 'input', required: false ,placeholder:'Введите корпус' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'flat', label: 'Офис/квартира', type: 'input', required: false ,placeholder:'Введите номер офиса или квартиры' , title:'Введите строку длиной до 50 знаков' , validaion: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков') },
      { name: 'fiasId', label: 'Идентификатор адреса ФИАС', type: 'input', required: false , placeholder:'Введиите идентификатор адреса ФИАС' , title:'Введите число длиной 36 знаков' , validation: Yup.string().length(36,'Введите число длиной 36 знаков')},
      { name: 'fiasText', label: 'ФИАС адрес в РФ', type: 'input', required: false , placeholder:'Введиите ФИАС адрес' , title:'Введите строку длиной до 1000 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-1000 знаков').max(1000, 'Введите строку длиной 1-1000 знаков')}, 
    ]},
    {section : 'Контактные данные', fields : [
      { name: 'phone', label: 'Номер контактного телефона/факс', type: 'input', required: false ,placeholder:'Введите телефон' , title:'Введите строку длиной 1-50 знаков' , validation: Yup.string().min(1, 'Введите строку длиной 1-50 знаков').max(50, 'Введите строку длиной 1-50 знаков')}, 
      { name: 'email', label: 'Email', type: 'input', required: false ,placeholder:'Введите email' , title:'Введите строку длиной 3-129 знаков' , validation: Yup.string().email('Invalid email').min(3,'Введите строку длиной 3-129 знаков').max(129,'Введите строку длиной 3-129 знаков')}, 
    ]},
  ]

  