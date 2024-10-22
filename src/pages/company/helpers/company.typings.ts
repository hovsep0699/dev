export type DefaultState = {
  details?: any;
  staffFilter?: {};
  connectors?: [];
  staff?: {
    recordsTotal: number;
    rows?: [];
  };
  staffRoles?: {
    recordsTotal: number;
    rows?: { id: number; title: string }[];
  };
  divisionEmployee?: {
    recordsTotal: number;
    rows: DivisionEmployee[];
  };
  noDivisionEmployee?: {
    recordsTotal: number;
    rows: DivisionEmployee[];
  };
  staffForRole?: {
    recordsTotal: number;
    rows?: {
      id: number;
      email: string;
      name: string;
      surname: string;
      patronymic?: string;
      position: string;
      socialNumber: string;
      status_system_name: string;
    }[];
  };
  noStaffForRole?: {
    recordsTotal: number;
    rows?: {
      id: number;
      email: string;
      name: string;
      surname: string;
      patronymic?: string;
      position: string;
      socialNumber: string;
      status_system_name: string;
    }[];
  };
  documentFlowRoles?: {};
  staffWaiting?: {
    recordsTotal: number;
    rows?: [];
  };
  staffDeactivated?: {
    recordsTotal: number;
    rows?: [];
  };
  divisions?: {
    recordsTotal: number;
    rows?: [];
  };
  createDivisionError?: {
    title?: [];
    kpp?: [];
    classificationNumber?: [];
    address?: {
      postalCode?: [];
      region?: [];
    };
  };
  employee?: Employee;
  connector?: {
    id: number;
    status?: ConnectorStatusType;
    operator?: {
      code: string;
      name: string;
      inn: string;
    };
    position?: string;
    fnsUid?: string;
    login?: string;
    boxId?: string;
    kpp?: string;
    errorMessage?: string;
  };
  employeeRoles?: {
    rows: { title: string; id: number }[];
    recordsTotal: number;
  };
  employeeNoRoles?: {
    rows: { title: string; id: number }[];
    recordsTotal: number;
  };
  employeeCertificate?: {
    rows: {
      active: boolean;
      data: string;
      id: number;
      thumbprint: string;
      valid_from: string;
      valid_until: string;
      position: string;
    }[];
    recordsTotal: number;
  };
  employeeDivisions?: {
    rows: {
      id: number;
      address_id: number;
      is_visible: boolean;
      kpp: string;
      title: string;
    }[];
    recordsTotal: number;
  };
  employeeContractorGroups: {
    rows: { id: number; title: string }[];
    recordsTotal: number;
  };
  employeeNoContractorGroups: {
    rows: { id: number; title: string }[];
    recordsTotal: number;
  };
  errors: {
    details?: {
      division: any;
      accountNumber?: any;
      taxAuthority?: any;
      bik?: any;
    };
    address?: {
      postalCode?: [];
      district?: [];
      city?: [];
      settlement?: [];
      street?: [];
      house?: [];
      building?: [];
      room?: [];
      region?: [];
    };
    connector?: {
      credentials?: {
        login?: {
          errors?: [];
        };
        password?: {
          errors?: [];
        };
      };
    };
  };
};

export type DivisionEmployee = {
  email?: string;
  id: number;
  name?: string;
  patronymic?: string;
  position?: string;
  socialNumber?: string;
  status_system_name?: string;
  surname?: string;
};

export type SetCompanyDetailsProps = {
  /** Номер расчётного счёта */
  accountNumber?: string;
  bik?: string;
  /** ОКПО */
  classificationNumber?: string;
  kpp: string;
  /** Код налогового органа */
  taxAuthority: string;
};

export type CreateConnectorAccountProps = {
  login: string;
  password: string;
  position: string;
  operatorCode: string;
  importFrom?: string;
  boxId?: string;
  fnsUid?: string;
  kpp?: string;
};

export type SetCompanyAddressProps = {
  postalCode?: string;
  region: string;
  district?: string;
  city?: string;
  settlement?: string;
  street?: string;
  house?: string;
  building?: string;
  room?: string;
  country?: number;
};

export enum ConnectorId {
  Kontur = '2BM',
  Korus = '2BK',
  Tenzor = '2BE'
}

export enum ConnectorName {
  '2BM' = '«СКБ Контур»',
  '2BK' = 'ООО «КОРУС Консалтинг СНГ»',
  '2BE' = 'ООО «Тензор»'
}

export enum ConnectorStatusName {
  created = 'Создан',
  /** импорт */
  import = 'Импорт',
  /** подключен */
  connector = 'Подключен',
  /** остановлен */
  stopped = 'Остановлен'
}
export enum ConnectorStatus {
  /** создан */
  created = 'created',
  /** импорт */
  import = 'import',
  /** подключен */
  connector = 'connector',
  /** остановлен */
  stopped = 'stopped'
}

export type ConnectorStatusType = keyof typeof ConnectorStatusName;

/** нет описания в сваггере */
export type Employee = {
  id: number;
  createdAt?: string;
  person?: {
    surname?: string;
    name?: string;
    patronymic?: string;
  };
  email?: string;
  position?: string;
  responsible?: boolean;
  defaultDivisionId?: number;
  status?: {
    title?: string;
    systemName?: string;
  };
};

/** Создание подразделения компании */
export type CompanyDivision = {
  title: string;
  kpp?: string;
  classificationNumber?: string;
  visible: boolean;
  region: string;
  regionTitle: string;
  postalCode: string;
  district?: string;
  city?: string;
  street?: string;
  building?: string;
  house?: string;
  room?: string;
  settlement?: string;
  phone?: string;
  email?: string;
};
