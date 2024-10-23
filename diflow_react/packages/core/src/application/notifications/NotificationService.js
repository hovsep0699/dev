import Environment from '../Environment';

class NotificationService {
  getNew(limit) {
    return Environment.getNotificationsGateway().getNew(limit);
  }

  getRead(limit) {
    return Environment.getNotificationsGateway().getRead(limit);
  }

  read(ids) {
    return Environment.getNotificationsGateway().readNotification(ids);
  }
}

const instance = new NotificationService();
export default instance;
