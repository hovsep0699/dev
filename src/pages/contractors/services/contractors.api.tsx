import ContractorService from '@distate/core/dist/application/contractor/common/ContractorService';
import DictionaryService from '@distate/core/dist/application/dictionary/common/DictionaryService';

import {
  DestinationType,
  getLegalEntityContractorsPayload,
  InvitationDecision,
  getNaturalEntityContractorsPayload
} from '../helpers/contractors.typings';

class ContractorApi {
  /** Поиск ЮЛ/ИП для создания приглашения локально */
  searchLocalCompany(payload: { inn?: string; name?: string; offset?: number }) {
    return ContractorService.searchLocalCompany(payload.inn, payload.name, payload.offset);
  }

  /** Поиск ЮЛ/ИП - Локальный роуминг */
  searchLocalRoamingCompany({
    inn,
    offset,
    limit
  }: {
    inn: string;
    offset?: number;
    limit?: number;
  }) {
    return ContractorService.searchLocalRoamingCompany(inn, offset, limit);
  }

  /** Получить список контрагентов ФЛ */
  searchNaturalEntity(payload: object) {
    return ContractorService.searchNaturalEntity(payload);
  }

  /** Cоздание локального приглашения ФЛ */
  createLocalInvitationPerson({ type, personID }: { type: DestinationType; personID: number }) {
    return ContractorService.createLocalInvitationPerson(type, personID);
  }

  /** Cоздание приглашения ЮЛ - Локальный */
  createLocalInvitationCompany({ type, companyID }: { type: DestinationType; companyID: number }) {
    return ContractorService.createLocalInvitationCompany(type, companyID);
  }

  /** Cоздание приглашения ЮЛ - Роуминг */
  createRoamingInvitationCompany({
    type,
    fnsUid,
    inn
  }: {
    type: DestinationType;
    fnsUid: string;
    inn: string;
  }) {
    return ContractorService.createRoamingInvitationCompany(type, fnsUid, inn);
  }

  /** Cоздание приглашения ЮЛ - Локальный Роуминг */
  createLocalRoamingInvitationCompany({
    type,
    fnsUid,
    networkId
  }: {
    type: DestinationType;
    fnsUid: string;
    networkId: string;
  }) {
    return ContractorService.createLocalRoamingInvitationCompany(type, fnsUid, networkId);
  }

  /** Cоздание приглашения ЮЛ - 1С-ЭДО */
  createTaxcomInvitationCompany({
    type,
    fnsUid,
    inn
  }: {
    type: DestinationType;
    fnsUid: string;
    inn: string;
  }) {
    return ContractorService.createTaxcomInvitationCompany(type, fnsUid, inn);
  }

  /** Просмотр входящих приглашений */
  getInvitationIncome({
    limit,
    offset,
    name,
    surname,
    patronymic,
    inn
  }: {
    limit?: number;
    offset?: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    inn?: string;
  }) {
    return ContractorService.getInvitationIncome(limit, offset, name, surname, patronymic, inn);
  }

  /** Просмотр исходящих приглашений */
  getInvitationOutcome({
    limit,
    offset,
    name,
    surname,
    patronymic,
    inn
  }: {
    limit?: number;
    offset?: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    inn?: string;
  }) {
    return ContractorService.getInvitationOutcome(limit, offset, name, surname, patronymic, inn);
  }

  /** Получить список контрагентов ЮЛ/ИП */
  getLegalEntityContractors(payload: getLegalEntityContractorsPayload) {
    return ContractorService.getLegalEntityContractors(
      payload.limit,
      payload.offset,
      payload.name,
      payload.inn,
      payload.externalOperator,
      payload.externalType,
      payload.status
    );
  }

  /** Получить список контрагентов ФЛ */
  getNaturalEntityContractors(payload: getNaturalEntityContractorsPayload) {
    return ContractorService.getNaturalEntityContractors(
      payload.limit,
      payload.offset,
      payload.name,
      payload.patronymic,
      payload.surname,
      payload.socialNumber
    );
  }

  /** Получить список операторов */
  getOperators() {
    return ContractorService.getOperators();
  }

  /** Заблокировать контрагента */
  blockContractor(id: number) {
    return ContractorService.blockContractor(id);
  }

  /** Принять или отклонить приглашение */
  invitationDecision(id: number, decision: InvitationDecision) {
    return ContractorService.invitationDecision(id, decision);
  }

  /** Получить список групп */
  getContractorsGroup(args: { offset?: number; limit?: number } = {}) {
    return ContractorService.getContractorsGroup(args.offset, args.limit);
  }

  /** Изменить название группы контрагентов */
  changeContractorsGroupTitle(id: number, title: string) {
    return ContractorService.changeContractorsGroupTitle(id, title);
  }

  /** Получить список ЮЛ/ИП в группе контрагентов или список компаний доступных для добавления в группу */
  getLegalEntityGroup({
    id,
    inverseJoin = false,
    offset = 0,
    limit = 10,
    name,
    inn
  }: {
    id: number;
    inverseJoin?: boolean;
    offset?: number;
    limit?: number;
    name?: string;
    inn?: string;
  }) {
    return ContractorService.getLegalEntityGroup(id, inverseJoin, offset, limit, name, inn);
  }

  /** Получить список ФЛ в группе контрагентов или список ФЛ доступных для добавления в группу */
  getNaturalEntityGroup({
    id,
    inverseJoin = false,
    offset = 0,
    limit = 10,
    name,
    surname,
    patronymic,
    socialNumber
  }: {
    id: number;
    inverseJoin?: boolean;
    offset?: number;
    limit?: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    socialNumber?: string;
  }) {
    return ContractorService.getNaturalEntityGroup(
      id,
      inverseJoin,
      offset,
      limit,
      name,
      surname,
      patronymic,
      socialNumber
    );
  }

  /** Получить список сотрудников в группе контрагентов или список сотрудников доступных для добавления в группу */
  getEmployeeGroup({
    id,
    inverseJoin = false,
    offset = 0,
    limit = 10,
    name,
    surname,
    patronymic,
    position
  }: {
    id: number;
    inverseJoin?: boolean;
    offset?: number;
    limit?: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    position?: string;
  }) {
    return ContractorService.getEmployeeGroup(
      id,
      inverseJoin,
      offset,
      limit,
      name,
      surname,
      patronymic,
      position
    );
  }

  /** Добавление контрагента в группу */
  addToGroup({ groupId, contractorId }: { groupId: number; contractorId: number }) {
    return ContractorService.addToGroup(groupId, contractorId);
  }

  /** Удаление контрагента из группы */
  removeFromGroup({ groupId, contractorId }: { groupId: number; contractorId: number }) {
    return ContractorService.removeFromGroup(groupId, contractorId);
  }

  /** Добавление сотрудника в группу */
  addEmployeeToGroup({ groupId, contractorId }: { groupId: number; contractorId: number }) {
    return ContractorService.addEmployeeToGroup(groupId, contractorId);
  }

  /** Удаление сотрудника из группы */
  removeEmployeeFromGroup({ groupId, contractorId }: { groupId: number; contractorId: number }) {
    return ContractorService.removeEmployeeFromGroup(groupId, contractorId);
  }

  /** Создание новой группы */
  newGroupCreate(title: string) {
    return ContractorService.newGroupCreate(title);
  }

  /** Удаление группы */
  removeGroup(id: number) {
    return ContractorService.removeGroup(id);
  }

  getExternalOperators() {
    return DictionaryService.getExternalOperators();
  }

  /** Получить группы контрагента "в которые он добавлен"/"в которых еще не состоит" */
  getContractorGroups({
    id,
    inverseJoin = false,
    offset,
    limit
  }: {
    id: number;
    inverseJoin?: boolean;
    offset?: number;
    limit?: number;
  }) {
    return ContractorService.getContractorGroups(id, inverseJoin, offset, limit);
  }

  /** Добавить контрагента в группу */
  addContractorToGroup({ groupId, contractorId }: { groupId: number; contractorId: number }) {
    return ContractorService.addContractorToGroup(groupId, contractorId);
  }

  /** Исключить контрагента из группы */
  deleteContractorGroup({ groupId, contractorId }: { groupId: number; contractorId: number }) {
    return ContractorService.deleteContractorGroup(groupId, contractorId);
  }

  /** Получить информацию о ФЛ */
  getPersonInfo(id: number) {
    return ContractorService.getPersonInfo(id);
  }

  /** Получить информацию о ЮЛ */
  getCompanyInfo(id: number) {
    return ContractorService.getCompanyInfo(id);
  }
}

const ContractorApiServices = new ContractorApi();
export { ContractorApiServices };
