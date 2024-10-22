import AJAX from '../../../infrastructure/AJAX';

/**
 * Контрагенты
 */
class ContractorGateway {
  /**
   * Поиск физ лица - Локальный
   * @param {object} payload
   */
   searchNaturalEntity(payload) {
    return AJAX.doGet('/front/invitation/person/search_local', payload);
  }


  /**
   * Поиск ЮЛ/ИП - Локальный
   * @param {string|undefined} inn 
   * @param {string|undefined} name
   * @param {number|undefined} offset 
   */
    searchLocalCompany(inn, name, offset) {
    return AJAX.doGet('/front/invitation/legal_entity/search_local', {
      inn,
      name,
      offset
    });
  }


  /**
   * Поиск ЮЛ/ИП - Локальный роуминг
   * @param {string} inn 
   */
   searchLocalRoamingCompany(inn, offset, limit) {
    return AJAX.doGet('/front/invitation/legal_entity/search_internal_roaming', {
      inn, offset, limit
    });
  }


  /**
   * создание приглашения ФЛ - Локально
   * @param {('local'|'roaming'|'internal_roaming'|'taxcom')} type 
   * @param {number} personId 
   */
   createLocalInvitationPerson(type, personId) {
    return AJAX.postJSON('/front/invitation/send', {
      type,
      personId
    });
  }


  /**
   * создание приглашения ЮЛ - Локально
   * @param {('local'|'roaming'|'internal_roaming'|'taxcom')} type 
   * @param {number} companyId 
   */
  createLocalInvitationCompany(type, companyId) {
    return AJAX.postJSON('/front/invitation/send', {
      type,
      companyId
    });
  }

  /**
   * создание приглашения ЮЛ - Роуминг
   * @param {('local'|'roaming'|'internal_roaming'|'taxcom')} type 
   * @param {string} fnsUid
   * @param {string} inn 
   */
   createRoamingInvitationCompany(type, fnsUid, inn) {
    return AJAX.postJSON('/front/invitation/send', {
      type,
      fnsUid,
      inn
    });
  }

  /**
   * создание приглашения ЮЛ - Локальный Роуминг
   * @param {('local'|'roaming'|'internal_roaming'|'taxcom')} type 
   * @param {string} fnsUid
   * @param {string} networkId 
   */
  createLocalRoamingInvitationCompany(type, fnsUid, networkId) {
    return AJAX.postJSON('/front/invitation/send', {
      type,
      fnsUid,
      networkId
    });
  }

  /**
   * создание приглашения ЮЛ - 1С-ЭДО
   * @param {('local'|'roaming'|'internal_roaming'|'taxcom')} type 
   * @param {string} fnsUid
   * @param {string} inn 
   */
  createTaxcomInvitationCompany(type, fnsUid, inn) {
    return AJAX.postJSON('/front/invitation/send', {
      type,
      fnsUid,
      inn
    });
  }

  /**
   * Просмотр входящих приглашений
   * @param {number|undefined} limit - Ограничение выборки
   * @param {number|undefined} offset - Пропустить записей
   */
  getInvitationIncome(limit, offset, name, surname, patronymic, inn) {
    return AJAX.doGet('/front/invitation/income', {
      limit,
      offset,
      name,
      surname,
      patronymic,
      inn
    });
  }

  /**
   * Просмотр исходящих приглашений
   */
  getInvitationOutcome(limit, offset, name, surname, patronymic, inn) {
    return AJAX.doGet('/front/invitation/outcome', {
      limit,
      offset,
      name,
      surname,
      patronymic,
      inn
    });
  }

  /**
   * Получить список контрагентов ЮЛ/ИП
   * @param {number|undefined} limit - Ограничение выборки
   * @param {number|undefined} offset - Пропустить записей
   * @param {string|undefined} name - Наименование
   * @param {string|undefined} inn - ИНН
   */
  getLegalEntityContractors(limit, offset, name, inn, externalOperator, externalType, status) {
    return AJAX.doGet('/front/contractor/legal_entity', {
      limit,
      offset,
      name,
      inn,
      externalOperator,
      externalType,
      status
    });
  }

  /**
   * Получить список контрагентов ФЛ
   * @param {number|undefined} limit - Ограничение выборки
   * @param {number|undefined} offset - Пропустить записей
   * @param {string|undefined} name - Имя
   * @param {string|undefined} patronymic - Отчество
   * @param {string|undefined} surname - Фамилия
   * @param {string|undefined} socialNumber - СНИЛС
   */
  getNaturalEntityContractors(limit, offset, name, patronymic, surname, socialNumber) {
    return AJAX.doGet('/front/contractor/natural_entity', {
      limit,
      offset,
      name,
      patronymic,
      surname,
      socialNumber
    });
  }

  /** Получить список операторов */
  getOperators() {
    return AJAX.doGet('/front/company/connector/');
  }

  /** Заблокировать контрагента */
  blockContractor(id) {
    return AJAX.postJSON(`/front/contractor/relation/${id}/block`)
  }

  /** Принять или отклонить приглашение */
  invitationDecision(id, decision) {
    return AJAX.postJSON(`/front/invitation/${id}/decision/${decision}`)
  }

  /** Получить список групп */
  getContractorsGroup(offset, limit = 10) {
    return AJAX.doGet('/front/contractor_group/', {
      offset,
      limit
    });
  }

  /** Изменить название группы контрагентов */
  changeContractorsGroupTitle(id, title) {
    return AJAX.postJSON(`/front/contractor_group/${id}`, {
      title
    })
  }

  /** Получить список ЮЛ/ИП в группе контрагентов или список компаний доступных для добавления в группу */
  getLegalEntityGroup(id, inverseJoin, offset, limit, name , inn) {
    return AJAX.doGet(`/front/contractor_group/${id}/contractor/legal_entities`,{
      limit,
      offset,
      inverseJoin: Number(inverseJoin),
      name,
      inn
    });
  }

  /** Получить список ФЛ в группе контрагентов или список ФЛ доступных для добавления в группу */
  getNaturalEntityGroup(
    id,
    inverseJoin,
    offset,
    limit,
    name,
    surname,
    patronymic,
    socialNumber
  ) {
    return AJAX.doGet(`/front/contractor_group/${id}/contractor/natural_entities`, {
      limit,
      offset,
      inverseJoin: Number(inverseJoin),
      name,
      surname,
      patronymic,
      socialNumber
    });
  }

  /** Получить список сотрудников в группе контрагентов или список сотрудников доступных для добавления в группу */
  getEmployeeGroup(id, inverseJoin, offset, limit, name, surname, patronymic, position) {
    return AJAX.doGet(`/front/contractor_group/${id}/employee`, {
      limit,
      offset,
      inverseJoin: Number(inverseJoin),
      name,
      surname,
      patronymic,
      position
    });
  }

  /** Добавление контрагента в группу */
  addToGroup(groupId, contractorId) {
    return AJAX.postJSON(`/front/contractor_group/${groupId}/contractor/${contractorId}`)
  }
  

  /** Удаление контрагента из группы */
  removeFromGroup(groupId, contractorId) {
    return AJAX.doDelete(`/front/contractor_group/${groupId}/contractor/${contractorId}`)
  }

  /** Добавление сотрудника в группу */
  addEmployeeToGroup(groupId, contractorId) {
    return AJAX.postJSON(`/front/contractor_group/${groupId}/employee/${contractorId}`)
  }
  
  /** Удаление сотрудника из группы */
  removeEmployeeFromGroup(groupId, contractorId) {
    return AJAX.doDelete(`/front/contractor_group/${groupId}/employee/${contractorId}`)
  }

  /** Создание новой группы */
  newGroupCreate(title) {
    return AJAX.postJSON(`/front/contractor_group/create`, {
      title
    })
  }

  /** Удаление группы */
  removeGroup(id) {
    return AJAX.doDelete(`/front/contractor_group/${id}`)
  }


  /** Получить группы контрагента "в которые он добавлен"/"в которых еще не состоит" */
  getContractorGroups(id, inverseJoin, offset, limit) {
    return AJAX.doGet(`/front/contractor/${id}/group`, {
      inverseJoin: Number(inverseJoin),
      offset,
      limit
    })
  }

  /** Добавить контрагента в группу */
  addContractorToGroup(groupId, contractorId) {
    return AJAX.postJSON(`/front/contractor_group/${groupId}/contractor/${contractorId}`)
  }

  /** Исключить контрагента из группы */
  deleteContractorGroup(groupId, contractorId) {
    return AJAX.doDelete(`/front/contractor_group/${groupId}/contractor/${contractorId}`)
  }

  /** Получить информацию о ФЛ */
  getPersonInfo(id) {
    return AJAX.doGet(`/front/person/${id}`)
  }

  /** Получить информацию о ЮЛ */
  getCompanyInfo(id) {
    return AJAX.doGet(`/front/contractor/legal_entity/${id}`)
  }


  
  

}

export default ContractorGateway;
