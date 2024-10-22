import React, { Component } from 'react';
import Dropdown from '../dropdown/Dropdown';
import { BOTTOM_RIGHT } from '../Placement';
import Badge from '../Badge';
import Button, { SECONDARY } from '../Button';
import { ICON } from '@distate/components';
import { NO_NEW_NOTIFICATIONS, NO_NOTIFICATIONS, NOTIFICATIONS, SHOW_MORE } from '../Lbl';
import DropdownHeader from '../dropdown/DropdownHeader';
import TabMenu from '../tabs/TabMenu';
import Tab from '../tabs/Tab';
import TabContent from '../tabs/TabContent';
import NotificationService from '@distate/core/dist/application/notifications/NotificationService';
import Flash from '../../common/flash/Flash';
import autobind from 'autobind-decorator';
import { Loading } from '@distate/components';
import DocumentNotification from '../notifications/DocumentNotification';
import ContractNotification from '../notifications/ContractNotification';
import Environment from '@distate/core/dist/application/Environment';
import NotificationGateway from '@distate/core/dist/application/notifications/NotificationGateway';
import NotificationContractGateway from '@distate/core/dist/application/notifications/NotificationContractGateway';

const NEW = 'Новые';
const READ = 'Прочитанные';
const INTERVAL_MS = 5000;
const LIMIT_INCREMENT = 5;

class NotificationsMenu extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      newCount: 0,
      readCount: 0,
      newLimit: LIMIT_INCREMENT,
      readLimit: LIMIT_INCREMENT,
      new: [],
      read: [],
      intervalId: null,
      currentTab: NEW,
      isBusy: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.startGettingNewNotifications();
    this.getReadNotifications();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newLimit !== this.state.newLimit) {
      this.setState({ isBusy: true });
      this.startGettingNewNotifications().then(() => {
        this.setState({ isBusy: false });
      });
    }
    if (prevState.readLimit !== this.state.readLimit) {
      this.setState({ isBusy: true });
      this.getReadNotifications().then(() => {
        this.setState({ isBusy: false });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  @autobind
  startGettingNewNotifications() {
    let interval = this.state.intervalId;
    const task = this.getNewNotifications;
    if (interval) {
      clearInterval(interval);
    }
    return task().then(() => {
      if(this._isMounted) {
        this.setState({ intervalId: setInterval(task, INTERVAL_MS) });
      }
    });
  }

  @autobind
  getNewNotifications() {
    const limit = this.state.newLimit;
    return NotificationService.getNew(limit)
      .then(res => {
        if(this._isMounted) {
          this.setState({ newCount: res.recordsTotal, new: res.rows });
        }
      })
      .catch(error => {
        Flash.error(error);
      });
  }

  @autobind
  getReadNotifications() {
    const limit = this.state.readLimit;
    return NotificationService.getRead(limit)
      .then(res => {
        if(this._isMounted) {
          this.setState({ readCount: res.recordsTotal, read: res.rows });
        }
      })
      .catch(error => {
        Flash.error(error);
      });
  }

  @autobind
  incrementNewLimit() {
    const incremented = this.state.newLimit + LIMIT_INCREMENT;
    this.setState({
      newLimit: incremented
    });
  }

  @autobind
  incrementReadLimit() {
    const incremented = this.state.readLimit + LIMIT_INCREMENT;
    this.setState({
      readLimit: incremented
    });
  }

  getDocumentTypeTitle(flowGroupTitle) {
    switch (flowGroupTitle) {
      case 'акт':
        return 'Акт';
      case 'универсальный передаточный документ':
        return 'УПД';
      case 'универсальный корректировочный документ':
        return 'УКД';
      case 'Неформализованный документооборот':
        return 'Неформализованный документ';
      case 'счет на оплату':
        return 'Счет на оплату';
      case 'накладная':
        return 'Накладная';
      case 'счет-фактура':
        return 'Счет-фактура';
      case 'корректировочный счет-фактура':
        return 'Корректировочный счет-фактура';
      case 'информационное сообщение':
        return 'Инфосооб';
      default:
        return 'Документ';
    }
  }

  @autobind
  createDocumentNotification(notification, type) {
    const {
      notification_id,
      document_id,
      document_number,
      type_title,
      flow_type_group_title,
      type_system_name,
      created_at
    } = notification;
    const isNew = type === NEW;

    return (
      <DocumentNotification
        key={notification_id}
        notificationId={notification_id}
        notificationStatus={type_system_name}
        docId={document_id}
        docNumber={document_number}
        docStatus={type_title}
        docTypeTitle={this.getDocumentTypeTitle(flow_type_group_title)}
        createdAt={created_at}
        isNew={isNew}
      />
    );
  }

  @autobind
  createContractNotification(notification, type) {
    const {
      notification_id,
      contract_id,
      contract_number,
      type_title,
      contract_title,
      type_system_name,
      created_at
    } = notification;
    const isNew = type === NEW;

    return (
      <ContractNotification
        key={notification_id}
        notificationId={notification_id}
        notificationStatus={type_system_name}
        contractId={contract_id}
        contractNumber={contract_number}
        contractStatus={type_title}
        contractTypeTitle={this.getDocumentTypeTitle(contract_title)}
        createdAt={created_at}
        isNew={isNew}
      />
    );
  }

  renderNotifications(type) {
    let notifications = [];
    if (type === READ) {
      notifications = this.state.read;
    } else {
      notifications = this.state.new;
    }
    return (
      <ul>
        {notifications.map(item => {
          if (item.hasOwnProperty('contract_id') && process.env.REACT_APP_FEATURE === 'contracts') {
            return this.createContractNotification(item, type);
          } else {
            return this.createDocumentNotification(item, type);
          }
        })}
      </ul>
    );
  }

  renderEmpty(text) {
    return (
      <div className="text-center notification-empty">
        <i className="ico ico-bell large color-grey"></i>
        <p className="text">{text}</p>
      </div>
    );
  }

  @autobind
  makeSelectIdsRead(ids) {
    this.setState({ isBusy: true });
    if (ids.length > 0) {
      NotificationService.read(ids)
        .then(this.startGettingNewNotifications)
        .then(this.getReadNotifications)
        .then(() => {
          this.setState({ isBusy: false });
        })
        .catch(error => {
          Flash.error(error);
          this.setState({ isBusy: false });
        });
    }
  }

  @autobind
  makeAllRead() {
    if (process.env.REACT_APP_FEATURE === 'contracts') {
      Environment.setNotificationsGateway(new NotificationGateway());
    }

    const documentIdsToMakeRead = this.state.new
      .filter(notification => !!notification.document_id)
      .map(notification => notification.notification_id);
    this.makeSelectIdsRead(documentIdsToMakeRead);

    if (process.env.REACT_APP_FEATURE === 'contracts') {
      Environment.setNotificationsGateway(new NotificationContractGateway());
      const contractIdsToMakeRead = this.state.new
        .filter(notification => !!notification.contract_id)
        .map(notification => notification.notification_id);
      this.makeSelectIdsRead(contractIdsToMakeRead);
    }
  }

  @autobind
  changeTab(label) {
    this.setState({ currentTab: label });
  }
  renderShowMoreBtn(callback) {
    return (
      <Button type="button" colorClass={SECONDARY} className="width-fluid-full" onClick={callback}>
        {SHOW_MORE}
      </Button>
    );
  }

  render() {
    const isNewActive = this.state.currentTab === NEW;
    const isReadActive = this.state.currentTab === READ;
    const showNewBtn = this.state.newLimit < this.state.newCount;
    const showReadBtn = this.state.readLimit < this.state.readCount;
    return (
      <Dropdown
        widthRestrict
        placement={BOTTOM_RIGHT}
        trigger={
          <Badge digit={this.state.newCount}>
            <Button iconClass={ICON.bell}>{NOTIFICATIONS}</Button>
          </Badge>
        }
      >
        <React.Fragment>{this.state.isBusy && <Loading isRelative={false} />}</React.Fragment>
        <DropdownHeader>
          <span>{NOTIFICATIONS}</span>
          <span className="right">{this.state.newCount}&nbsp;новых</span>
          <TabMenu>
            <Tab label={NEW} isActive={isNewActive} onClick={this.changeTab}></Tab>
            <Tab label={READ} isActive={isReadActive} onClick={this.changeTab}></Tab>
          </TabMenu>
        </DropdownHeader>
        <TabContent isActive={isNewActive}>
          <div className="dropdown-scroll">
            {this.state.new.length === 0
              ? this.renderEmpty(NO_NEW_NOTIFICATIONS)
              : this.renderNotifications(NEW)}
          </div>
          {this.state.new.length !== 0 && (
            <div className="col-12 slim">
              <div className="col-6 slim">
                {showNewBtn && this.renderShowMoreBtn(this.incrementNewLimit)}
              </div>
              <div className="col-6 slim">
                <Button type="button" className="width-fluid-full" onClick={this.makeAllRead}>
                  В прочитанные
                </Button>
              </div>
            </div>
          )}
        </TabContent>
        <TabContent isActive={isReadActive}>
          <div className="dropdown-scroll">
            {this.state.read.length === 0
              ? this.renderEmpty(NO_NOTIFICATIONS)
              : this.renderNotifications(READ)}
          </div>
          <div className="col-12 slim">
            {showReadBtn && this.renderShowMoreBtn(this.incrementReadLimit)}
          </div>
        </TabContent>
      </Dropdown>
    );
  }
}

export default NotificationsMenu;
