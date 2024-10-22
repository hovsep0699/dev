import AJAX from '../../infrastructure/AJAX';
import getFormData from '../utils/getFormData';

class NotificationGateway {
  getNew(limit = 5) {
    return AJAX.doGet('/front/notification', {
      isRead: 0,
      sortField: 'created_at',
      sortType: 'desc',
      limit
    });
  }

  getRead(limit = 5) {
    return AJAX.doGet('/front/notification', {
      isRead: 1,
      sortField: 'created_at',
      sortType: 'desc',
      limit
    });
  }

  readNotification(ids) {
    return AJAX.postFormData('/front/notification/read', getFormData(ids));
  }
}

export default NotificationGateway;
