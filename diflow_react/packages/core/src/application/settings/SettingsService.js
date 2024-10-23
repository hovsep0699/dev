import { assert } from 'chai';
import AJAX from '../../infrastructure/AJAX';
import errFactory from '../error/ErrorFactory';
import { CHANGE_SETTINGS } from '../error/Error';
import Setting from '../../domain/settings/Setting';
import Environment from '../Environment';

const mapToSettings = ({ rows }) =>
  rows.map(({ type_id, systemName, title, comment, email }) => [
    systemName,
    new Setting(type_id, systemName, title, comment, email)
  ]);

const handleResponse = data => {
  if (!data.rows) return { rows: [] };
  return data;
};

class SettingsService {
  constructor() {
    this._settings = new Map();
    this._isAlreadyGetNofificationSettings = false;
  }

  getNotifications() {
    if (this._isAlreadyGetNofificationSettings) {
      return this._settings;
    }
    return Environment.getAuthGateway()
      .notificationSettings()
      .then(handleResponse)
      .then(mapToSettings)
      .then(settings => {
        this._settings = new Map(settings);
        this._isAlreadyGetNofificationSettings = true;
      });
  }

  async updateNotifications(settings) {
    const promises = [];
    settings.forEach(setting => promises.push(this.updateNotification(setting)));
    return Promise.all(promises);
  }

  async updateNotification(setting) {
    try {
      assert.instanceOf(setting, Setting);

      const { id, field, title, description, value } = setting;

      const url = `/front/notification/setting/${id}`;
      const formData = new FormData();
      formData.append('email', value ? 1 : 0); // TODO когда будут готовы задачи RCT-61, RCT-62, эта строка измениться

      await AJAX.postFormData(url, formData);

      this._settings.set(field, new Setting(id, field, title, description, value));
      return this._settings;
    } catch (error) {
      throw errFactory(CHANGE_SETTINGS, `Не удалось обновить настройку ${setting.name}`, error);
    }
  }
}

const instance = new SettingsService();
export default instance;
