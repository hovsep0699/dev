import AJAX from '../../infrastructure/AJAX';
import NotificationGateway from './NotificationGateway';
import getFormData from '../utils/getFormData';

class NotificationContractGateway extends NotificationGateway {
  getNew(limit = 5) {
    return AJAX.doGet('/front/notifications/extended', {
      isRead: 0,
      sortField: 'created_at',
      sortType: 'desc',
      limit
    });
  }

  getRead(limit = 5) {
    return AJAX.doGet('/front/notifications/extended', {
      isRead: 1,
      sortField: 'created_at',
      sortType: 'desc',
      limit
    });
  }

  readNotification(ids) {
    return AJAX.postFormData('/front/notifications/extended/read', getFormData(ids));
  }
}

export default NotificationContractGateway;
