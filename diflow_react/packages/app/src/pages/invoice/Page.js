import React from 'react';
import PageBase from '../../common/PageBase';
import autobind from 'autobind-decorator';
import TopBar from '../../common/topbar/TopBar';
import Core from '@distate/core/dist/application/Core';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import Menu from '../../common/menu/Menu';
import { CREATE_INVOICE, EDIT_INVOICE } from '../../common/Lbl';
import InvoiceForm from './forms/InvoiceForm';
import get from 'get-value';

/** Счет-фактура */
class Page extends PageBase {
  @autobind
  renderPage(config) {
    const page = [];
    page.push(<Menu />);
    page.push(this.renderTopBar(config));
    page.push(this.renderContent(config));
    return page;
  }

  render() {
    const isGranted = Core.company.isComplete && SecurityService.hasDocumentRole();
    const { match, location } = this.props;
    const idFromMatch = get(match, 'params.id');
    const locationSearchWithDocumentId = get(location, 'search').match(/\?id=(\d+)/);
    const idFromLocation = locationSearchWithDocumentId && locationSearchWithDocumentId[1];
    const documentId = idFromMatch || idFromLocation;
    const isEdit = !idFromLocation && idFromMatch;
    return this.renderPage([
      {
        content: () => (
          <React.Fragment>
            <div className="col-12">
              <InvoiceForm id={documentId} isEdit={isEdit} />
            </div>
          </React.Fragment>
        ),
        topbar: () => (
          <TopBar hideButtons={!isGranted} fullscreenMode>
            {isEdit ? EDIT_INVOICE : CREATE_INVOICE}
          </TopBar>
        )
      }
    ]);
  }
}

export default Page;
