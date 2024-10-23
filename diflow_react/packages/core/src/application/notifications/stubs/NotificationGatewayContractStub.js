import mockContractNotifications from '../../../mocks/200/notifications_contract';
import mockContractNotificationsRead from '../../../mocks/200/notifications_contract_read';
import mockSuccess from '../../../mocks/200/success';
import NotificationGateway from '../NotificationGateway';

class NotificationGatewayContractStub extends NotificationGateway {
  getNew() {
    return Promise.resolve(mockContractNotifications);
  }

  getRead() {
    return Promise.resolve(mockContractNotificationsRead);
  }

  readNotification() {
    return Promise.resolve(mockSuccess);
  }
}

export default NotificationGatewayContractStub;
