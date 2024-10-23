import mockNotifications from '../../../mocks/200/notifications';
import emptyNotifications from '../../../mocks/200/empty_notifications';
import mockSuccess from '../../../mocks/200/success';
import NotificationGateway from '../NotificationGateway';

class NotificationGatewayStub extends NotificationGateway {
  getNew() {
    return Promise.resolve(mockNotifications);
  }

  getRead() {
    return Promise.resolve(emptyNotifications);
  }

  readNotification() {
    return Promise.resolve(mockSuccess);
  }
}

export default NotificationGatewayStub;
