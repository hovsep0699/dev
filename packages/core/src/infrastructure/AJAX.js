import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class AJAX {
  static doGet(url, params) {
    return axios.get(url, { params }).then(response => response.data);
  }

  static doPost(url, params) {
    if (params) {
      return axios.post(url, { params });
    }
    return axios.post(url);
  }

  static doDelete(url, params) {
    return axios.delete(url, params);
  }

  static postJSON(url, json) {
    return axios.post(url, json);
  }

  static postFormData(url, formData) {
    return axios.post(url, formData);
  }

  static deleteFormData(url, data) {
    return axios.delete(url, {
      data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
  }
}

export default AJAX;
