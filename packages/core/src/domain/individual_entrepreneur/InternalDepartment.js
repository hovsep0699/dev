/*
Внутренние подразделения нужны чтобы проверять/утверждать документ перед отправкой контрагенту
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
      throw new Error('Параметр должен быть экземпляром класса individual_entrepreneur/Employee');
    }
    this._employees.set(employee.id, employee);
  }

  get id() {
    return this._id;
  }
}
