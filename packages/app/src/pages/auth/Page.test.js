import React from 'react';
import ReactDOM from 'react-dom';
import AuthPage from './Page';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { MockCertificateService } from '@distate/core/dist/application/certificate/CertificateService';

import MockCryptoProGetCertificatesStrategy from '@distate/core/dist/application/certificate/get/MockCryptoProGetCertificatesStrategy';
import mockCryptoProJson from '@distate/core/dist/mocks/certs/crypto_pro_certs';

import MockDiffCertificatesStrategy from '@distate/core/dist/application/certificate/diff/MockDiffCertificatesStrategy';
import mockDiffCertsJson from '@distate/core/dist/mocks/200/diffs_certs_all_active';

it('renders without crashing', () => {
  MockCertificateService.getCertificatesStrategy = new MockCryptoProGetCertificatesStrategy(
    mockCryptoProJson
  );
  MockCertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(
    mockDiffCertsJson
  );
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={() => <AuthPage certService={MockCertificateService} />} />
      </Switch>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
