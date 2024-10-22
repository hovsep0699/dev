import { RelationStatus } from './helpers/contractors.typings';

/** Результат поиска физ лица локально для создания приглашения */
export const MOCK_PERSON_SEARCH_LOCAL = {
  rows: [
    {
      id: '1',
      name: 'name_1',
      surname: 'surname_1',
      patronymic: 'patronymic_1',
      socialNumber: '111',
      relationStatus: RelationStatus.Active
    },
    {
      id: '2',
      name: 'name_2',
      surname: 'surname_2',
      patronymic: 'patronymic_2',
      socialNumber: '222',
      relationStatus: RelationStatus.Blocked
    },
    {
      id: '3',
      name: 'name_3',
      surname: 'surname_3',
      patronymic: 'patronymic_3',
      socialNumber: '333',
      relationStatus: RelationStatus.Active
    },
    {
      id: '4',
      name: 'name_4',
      surname: 'surname_4',
      patronymic: 'patronymic_4',
      socialNumber: '444',
      relationStatus: RelationStatus.Active
    }
  ]
};

/** Результат поиска юр лица для создания приглашения - Локальный */
export const MOCK_COMPANY_SEARCH_LOCAL = {
  rows: [
    {
      id: '1',
      name: 'name_1',
      inn: '111111',
      relationStatus: RelationStatus.Active
    },
    {
      id: '2',
      name: 'name_2',
      inn: '222222',
      relationStatus: RelationStatus.Blocked
    },
    {
      id: '3',
      name: 'name_3',
      inn: '33333',
      relationStatus: RelationStatus.Active
    },
    {
      id: '4',
      name: 'name_4',
      inn: '444444',
      relationStatus: RelationStatus.Active
    }
  ]
};

/** Результат поиска юр лица для создания приглашения - Локальный роуминг */
export const MOCK_COMPANYSEARCH_LOCAL_ROAMING = {
  rows: [
    {
      fnsUid: '11111',
      network: '10101010',
      name: 'name_1',
      inn: '19191919',
      relationStatus: RelationStatus.Active
    },
    {
      fnsUid: '22222',
      network: '20202020',
      name: 'name_2',
      inn: '29292929',
      relationStatus: RelationStatus.Active
    },
    {
      fnsUid: '33333',
      network: '30303030',
      name: 'name_3',
      inn: '39393939',
      relationStatus: RelationStatus.Blocked
    },
    {
      fnsUid: '44444',
      network: '40404040',
      name: 'name_4',
      inn: '49494949',
      relationStatus: RelationStatus.Active
    }
  ]
};

/** полученный список групп контрагентов */
export const MOCK_CONTRACTOR_GROUP = {
  recordsTotal: 2,
  rows: [
    {
      id: 4,
      title: 'Общие'
    },
    {
      id: 6,
      title: 'гр2'
    }
  ]
};

/** добавленные  */
export const MOCK_NATURAL_ENTITY_ADDED_GROUP = {
  recordsTotal: 12,
  rows: [
    {
      id: 1,
      surname: 'Акимов',
      name: 'Антон',
      patronymic: 'Львович',
      socialNumber: '25274487592',
      status: 'active',
      contractorId: 1
    },
    {
      id: 2,
      surname: 'Мельников',
      name: 'Макар',
      patronymic: 'Александрович',
      socialNumber: '25243685169',
      status: 'blocked',
      contractorId: 2
    },
    {
      id: 3,
      surname: 'Акимов',
      name: 'Антон',
      patronymic: 'Львович',
      socialNumber: '25274487592',
      status: 'active',
      contractorId: 3
    },
    {
      id: 4,
      surname: 'Мельников',
      name: 'Макар',
      patronymic: 'Александрович',
      socialNumber: '25243685169',
      status: 'blocked',
      contractorId: 4
    },
    {
      id: 5,
      surname: 'Акимов',
      name: 'Антон',
      patronymic: 'Львович',
      socialNumber: '25274487592',
      status: 'active',
      contractorId: 5
    },
    {
      id: 6,
      surname: 'Мельников',
      name: 'Макар',
      patronymic: 'Александрович',
      socialNumber: '25243685169',
      status: 'blocked',
      contractorId: 6
    },
    {
      id: 7,
      surname: 'Акимов',
      name: 'Антон',
      patronymic: 'Львович',
      socialNumber: '25274487592',
      status: 'active',
      contractorId: 7
    },
    {
      id: 8,
      surname: 'Мельников',
      name: 'Макар',
      patronymic: 'Александрович',
      socialNumber: '25243685169',
      status: 'blocked',
      contractorId: 8
    },
    {
      id: 9,
      surname: 'Акимов',
      name: 'Антон',
      patronymic: 'Львович',
      socialNumber: '25274487592',
      status: 'active',
      contractorId: 9
    },
    {
      id: 10,
      surname: 'Мельников',
      name: 'Макар',
      patronymic: 'Александрович',
      socialNumber: '25243685169',
      status: 'blocked',
      contractorId: 10
    },
    {
      id: 11,
      surname: 'Акимов',
      name: 'Антон',
      patronymic: 'Львович',
      socialNumber: '25274487592',
      status: 'active',
      contractorId: 11
    },
    {
      id: 12,
      surname: 'Мельников',
      name: 'Макар',
      patronymic: 'Александрович',
      socialNumber: '25243685169',
      status: 'blocked',
      contractorId: 12
    }
  ]
};

export const MOCK_LOCAL_ROAMING_COMPANIES = {
  rows: [
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '1',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '2',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '3',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '4',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '5',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '6',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '7',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '8',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '9',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '10',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '11',
      relationStatus: 'active'
    },
    {
      fnsUid: 'string',
      network: 'string',
      name: 'string',
      inn: '12',
      relationStatus: 'active'
    }
  ],
  recordsTotal: 12
};
