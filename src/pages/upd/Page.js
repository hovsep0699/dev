import React from 'react';
import PageBase from '../../common/PageBase';
import autobind from 'autobind-decorator';
import TopBar from '../../common/topbar/TopBar';
import Core from '@distate/core/dist/application/Core';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import Menu from '../../common/menu/Menu';
import { CREATE_UPD, EDIT_UPD } from '../../common/Lbl';
import UPDForm from './forms/UPDForm';
import get from 'get-value';

// TODO: "выпилить" данный калсс
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
              <UPDForm id={documentId} isEdit={isEdit} />
            </div>
          </React.Fragment>
        ),
        topbar: () => (
          <TopBar hideButtons={!isGranted} fullscreenMode>
            {isEdit ? EDIT_UPD : CREATE_UPD}
          </TopBar>
        )
      }
    ]);
  }
}

export default Page;
