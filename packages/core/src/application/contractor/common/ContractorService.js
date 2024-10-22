import Environment from '../../Environment';

class ContractorService {
  /**
   * Поиск ЮЛ/ИП для создания приглашения локально
   * @param {string|undefined} inn 
   * @param {string|undefined} name 
   * @param {number|undefined} offset
   */
   searchLocalCompany(inn, name, offset) {
    return Environment.getContractorGateway().searchLocalCompany(inn, name, offset);
  }


  /**
   * Поиск ЮЛ/ИП для создания приглашения - Локальный роуминг
   */
   searchLocalRoamingCompany(inn, offset, limit) {
    return Environment.getContractorGateway().searchLocalRoamingCompany(inn, offset, limit);
  }

  
  
  /**
   * Получить список контрагентов ФЛ
   * @param {object} payload
   */
   searchNaturalEntity(payload) {
    return Environment.getContractorGateway().searchNaturalEntity(payload);
  }

  /**
   * Cоздание приглашения ФЛ - Локально
   */
   createLocalInvitationPerson(type, personID) {
    return Environment.getContractorGateway().createLocalInvitationPerson(type, personID);
  }

  /**
   * Cоздание приглашения ЮЛ - Локально
   */
  createLocalInvitationCompany(type, companyID) {
    return Environment.getContractorGateway().createLocalInvitationCompany(type, companyID);
  }



  /**
   * Создание приглашения ЮЛ - Роуминг
   */
   createRoamingInvitationCompany(type, fnsUid, inn) {
    return Environment.getContractorGateway().createRoamingInvitationCompany(type, fnsUid, inn);
  }


  /**
   * Создание приглашения ЮЛ - Локальный Роуминг
   */
   createLocalRoamingInvitationCompany(type, fnsUid, networkId) {
    return Environment.getContractorGateway().createLocalRoamingInvitationCompany(type, fnsUid, networkId);
  }


  /**
   * Создание приглашения ЮЛ - 1С-ЭДО
   */
   createTaxcomInvitationCompany(type, fnsUid, inn) {
    return Environment.getContractorGateway().createTaxcomInvitationCompany(type, fnsUid, inn);
  }

  /**
   * Просмотр входящих приглашений
   * @param {number|undefined} limit - Ограничение выборки
   * @param {number|undefined} offset - Пропустить записей
   */
  getInvitationIncome(limit, offset, name, surname, patronymic, inn) {
    return Environment.getContractorGateway().getInvitationIncome(limit, offset, name, surname, patronymic, inn);
  }

  /**
   * Просмотр исходящих приглашений
   */
  getInvitationOutcome(limit, offset, name, surname, patronymic, inn) {
    return Environment.getContractorGateway().getInvitationOutcome(limit, offset, name, surname, patronymic, inn);
  }

  /**
   * Получить список контрагентов ЮЛ/ИП
   * @param {number|undefined} limit - Ограничение выборки
   * @param {number|undefined} offset - Пропустить записей
   * @param {string|undefined} name - Наименование
   * @param {string|undefined} inn - ИНН
   */
  getLegalEntityContractors(limit, offset, name, inn, externalOperator, externalType, status) {
    return Environment.getContractorGateway().getLegalEntityContractors(limit, offset, name, inn, externalOperator, externalType, status);
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
    return Environment.getContractorGateway().getNaturalEntityContractors(limit, offset, name, patronymic, surname, socialNumber);
  }

  /** Получить список операторов */
  getOperators() {
    return Environment.getContractorGateway().getOperators();
  }

  /** Заблокировать контрагента */
  blockContractor(id) {
    return Environment.getContractorGateway().blockContractor(id);
  }

  /** Принять или отклонить приглашение */
  invitationDecision(id, decision) {
    return Environment.getContractorGateway().invitationDecision(id, decision);
  }

  /** Получить список групп */
  getContractorsGroup(offset, limit) {
    return Environment.getContractorGateway().getContractorsGroup(offset, limit);
  }

  /** Изменить название группы контрагентов */
  changeContractorsGroupTitle(id, title) {
    return Environment.getContractorGateway().changeContractorsGroupTitle(id, title);
  }


  /** Получить список ЮЛ/ИП в группе контрагентов или список компаний доступных для добавления в группу */
  getLegalEntityGroup(id, inverseJoin, offset, limit, name, inn) {
    return Environment.getContractorGateway().getLegalEntityGroup(id, inverseJoin, offset, limit, name, inn);
  }

  /** Получить список ФЛ в группе контрагентов или список ФЛ доступных для добавления в группу */
  getNaturalEntityGroup(
    id, inverseJoin, offset, limit, name, surname, patronymic, socialNumber) {
    return Environment.getContractorGateway().getNaturalEntityGroup(
      id, inverseJoin, offset, limit, name, surname, patronymic, socialNumber
    );
  }

  /** Получить список сотрудников в группе контрагентов или список сотрудников доступных для добавления в группу */
  getEmployeeGroup(id, inverseJoin, offset, limit, name, surname, patronymic, position) {
    return Environment.getContractorGateway().getEmployeeGroup(id, inverseJoin, offset, limit, name, surname, patronymic, position);
  }

  /** Добавление контрагента в группу */
  addToGroup(groupId, contractorId) {
    return Environment.getContractorGateway().addToGroup(groupId, contractorId);
  }  

  /** Удаление контрагента из группы */
  removeFromGroup(groupId, contractorId) {
    return Environment.getContractorGateway().removeFromGroup(groupId, contractorId);
  }

  /** Добавление сотрудника в группу */
  addEmployeeToGroup(groupId, contractorId) {
    return Environment.getContractorGateway().addEmployeeToGroup(groupId, contractorId);
  }
  
  /** Удаление сотрудника из группы */
  removeEmployeeFromGroup(groupId, contractorId) {
    return Environment.getContractorGateway().removeEmployeeFromGroup(groupId, contractorId);
  }

  /** Создание новой группы */
  newGroupCreate(title) {
    return Environment.getContractorGateway().newGroupCreate(title);
  }

  /** Удаление группы */
  removeGroup(id) {
    return Environment.getContractorGateway().removeGroup(id);
  }


  /** Получить группы контрагента "в которые он добавлен"/"в которых еще не состоит" */
  getContractorGroups(id, inverseJoin, offset, limit) {
    return Environment.getContractorGateway().getContractorGroups(id, inverseJoin, offset, limit);
  }

  /** Добавить контрагента в группу */
  addContractorToGroup(groupId, contractorId) {
    return Environment.getContractorGateway().addContractorToGroup(groupId, contractorId);
  }

  /** Исключить контрагента из группы */
  deleteContractorGroup(groupId, contractorId) {
    return Environment.getContractorGateway().deleteContractorGroup(groupId, contractorId);
  }

  /** Получить информацию о ФЛ */
  getPersonInfo(id) {
    return Environment.getContractorGateway().getPersonInfo(id);
  }

  /** Получить информацию о ЮЛ */
  getCompanyInfo(id) {
    return Environment.getContractorGateway().getCompanyInfo(id);
  }


}

const instance = new ContractorService();
export default instance;
