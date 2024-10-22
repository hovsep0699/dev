/*
Внутренние подразделения нужны чтобы проверять/утверждать документ перед отправкой контрагенту
В конце документа планируется поставить печать со списком всех кто этот документ проверял/утверждал
Нужно для крупных компаний типо Ростелекома когда перед отправкой контрагенту документ утверждают внутри компании
500 человек
 */
import Employee from './Employee';

export default class InternalDepartment {
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._employees = new Map();
  }

  addEmployee(employee) {
    if (!(employee instanceof Employee)) {
      throw new Error('Параметр должен быть экземпляром класса legal_entity/Employee');
    }
    this._employees.set(employee.id, employee);
  }
}
