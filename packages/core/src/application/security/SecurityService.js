import Environment from '../Environment';
import DiError, { SECURITY } from '../error/Error';

class SecurityService {
  constructor() {
    this._roles = new Map();
  }

  update(successCallback) {
    const url = '/front/user/current';
    const successHandler = rawUser => {
      this._roles = new Map();
      rawUser.roles.forEach(role => {
        this.addRole(role);
      });
      successCallback();
    };

    const failHandler = error => {
      throw new DiError(SECURITY, 'Ошибка получения прав пользователя', `Запрос ${url}`, error);
    };

    return Environment.getAuthGateway()
      .currentUser()
      .then(successHandler)
      .catch(failHandler);
  }

  clear() {
    this._roles = new Map();
  }

  addRole(role) {
    this._roles.set(role, true);
  }

  hasRole(role) {
    return Array.from(this._roles.keys()).includes(role);
  }

  hasExactRole(role) {
    return this._roles.has(role);
  }

  hasRoles(roles) {
    return roles.some(role => this.hasRole(role));
  }

  hasDocumentRole() {
    const keys = Array.from(this._roles.keys());
    return keys.some(
      role =>
        role.includes('ROLE_CNO') !== -1
    );
  }

  hasConnecterRole() {
    const keys = Array.from(this._roles.keys());
    return keys.some(role => role === 'ROLE_CONNECTOR_OPERATOR' || role === 'ROLE_CNO');
  }

  hasSignRole() {
    return Array.from(this._roles.keys()).some(
      role => role.includes('ROLE_DOCUMENT_SIGNOR') || role.includes('ROLE_CNO')
    );
  }
}

const instance = new SecurityService();
export default instance;
