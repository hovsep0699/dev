import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Grommet } from 'grommet';
import styled, { ThemeProvider } from 'styled-components';
import { theme, grommetTheme } from '@distate/components';
import Environment from '@distate/core/dist/application/Environment';
import NotificationContractGateway from '@distate/core/dist/application/notifications/NotificationContractGateway';

import AuthPage from './pages/auth/Page';
import { CompanyPage } from './pages/company';
import FlashContainer from './common/flash/components/Container';
import mergeTheme from './utils/mergeTheme';
import PrivateRoute from './utils/routes/PrivateRoute';
import ExternalRoute from './utils/routes/ExternalRoute';
import {
  DOCUMENT,
  DOCUMENT_VIEW,
  CABINET,
  COMPANY,
  AUTH,
  MAIN,
  TARIFF,
  SYSTEM,
  CONTRACTOR,
  NEW_UNIVERSAL_INVOICE,
  EDIT_UNIVERSAL_INVOICE,
  NEW_UNIVERSAL_CORRECTION_DOCUMENT,
  NEW_INVOICE_UTD,
  EDIT_INVOICE_UTD,
  EDIT_UNIVERSAL_CORRECTION_DOCUMENT,
  FINANCE,
  CREATE_FROM_FILE,
  NEW_UNFORMALIZED,
  EDIT_UNFORMALIZED, POA
} from './common/Url';
import UPDPage from './pages/upd/Page';
import InvoicePage from './pages/invoice/Page';
import { DocumentsPage } from './pages/documents/documents.page';
import { UniversalCorrectionDocumentPage } from './pages/upd/universal-correction-document.page';

import configureStore from './store/configureStore';
import { CONTRACTS, CONTRACTS_VIEW } from './common/Url';
import { ContractorsPage } from './pages/contractors';
import { FinancePage } from './pages/finance';
import { SystemPage } from './pages/system';
import { ErrorBoundary } from './common/error-boundary/ErrorBoundary';
import { CreateFromFilePage, CreateUnformalizedPage, EditUnformalizedPage } from './pages/create-document';
import { CabinetPage } from './pages/cabinet/cabinet.page';
import { TariffPage } from './pages/tariff/tariff.page';
import { MainPage } from './pages/main/main.page';
import {POAPage} from "./pages/POA/POAPage";
// import {POAPage} from "./pages/MCHD_ROOT/Test";



const StyledGrommet = styled(Grommet)`
  height: 100%;
`;

if (process.env.REACT_APP_FEATURE === 'contracts') {
  Environment.setNotificationsGateway(new NotificationContractGateway());
}

export const history = createBrowserHistory();

export const store = configureStore({}, history);

window.onerror = function (errorMessage, errorUrl, errorLine) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/front/log/write', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({
    message: "URL:" + errorUrl + " LINE: " + errorLine + " ERR: " + errorMessage
  }));

  return false;
}


class App extends Component {
  componentDidMount() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.remove();
    }
  }
  render() {
    const appTheme = mergeTheme(theme);
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <StyledGrommet theme={grommetTheme}>
            <ThemeProvider theme={appTheme}>
              <ConnectedRouter history={history}>
              
                <Switch>
                  <Route path={AUTH} component={AuthPage} />
                  <Route path={MAIN} component={MainPage} exact />
                  <PrivateRoute path={CREATE_FROM_FILE} component={CreateFromFilePage} />
                  <PrivateRoute path={NEW_UNFORMALIZED} component={CreateUnformalizedPage} />
                  <PrivateRoute path={EDIT_UNFORMALIZED} component={EditUnformalizedPage} />

                  <PrivateRoute path={NEW_UNIVERSAL_INVOICE} component={UPDPage} />
                  <PrivateRoute path={EDIT_UNIVERSAL_INVOICE} component={UPDPage} />
                  <PrivateRoute path={NEW_UNIVERSAL_CORRECTION_DOCUMENT} component={UniversalCorrectionDocumentPage} />
                  <PrivateRoute path={EDIT_UNIVERSAL_CORRECTION_DOCUMENT} component={UniversalCorrectionDocumentPage} />

                  <PrivateRoute path={EDIT_UNIVERSAL_INVOICE} component={UPDPage} />
                  <PrivateRoute path={NEW_INVOICE_UTD} component={InvoicePage} />
                  <PrivateRoute path={EDIT_INVOICE_UTD} component={InvoicePage} />
                  <ExternalRoute path={DOCUMENT_VIEW} />
                  <PrivateRoute path={DOCUMENT} component={DocumentsPage} />
                  <PrivateRoute path={CABINET} component={CabinetPage} />
                  <PrivateRoute path={COMPANY} component={CompanyPage} />
                  <PrivateRoute path={SYSTEM} component={SystemPage} />
                  <PrivateRoute path={CONTRACTOR} component={ContractorsPage}/>
                  <PrivateRoute path={FINANCE} component={FinancePage} />
                  <PrivateRoute path={TARIFF} component={TariffPage}/>
                  <PrivateRoute path={POA} component={POAPage}/>
                  {process.env.REACT_APP_FEATURE === 'contracts' && (
                    <>
                      <ExternalRoute path={CONTRACTS_VIEW} />
                      <ExternalRoute path={CONTRACTS} />
                    </>
                  )}
                </Switch>
              </ConnectedRouter>
              <FlashContainer />
            </ThemeProvider>
          </StyledGrommet>
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
