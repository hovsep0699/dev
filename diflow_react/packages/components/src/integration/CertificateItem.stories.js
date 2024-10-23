// import React from "react";
// import { storiesOf } from "@storybook/react";
// import LoginByCertForm from "../../src/auth/forms/LoginByCertForm";
// import { MemoryRouter } from "react-router-dom";
// import { AUTH_CERT } from "../../src/common/Url";
// import FlashContainer from "../../src/common/flash/components/Container";
// import MockCryptoProGetCertificatesStrategy from "diflow/lib/application/certificate/get/MockCryptoProGetCertificatesStrategy";
// import MockDiffCertificatesStrategy from "diflow/lib/application/certificate/diff/MockDiffCertificatesStrategy";

// import certs_mock from "diflow/lib/mocks/certs/crypto_pro_certs";
// import diff_mock_all_active from "diflow/lib/mocks/200/diffs_certs_all_active";

// import { CertificateService } from "diflow/lib/application/certificate/CertificateService";
// import AuthGatewayStub from "diflow/lib/application/auth/stubs/AuthCompanyULCompleteStub";
// import CompanyGatewayStub from "diflow/lib/application/company/stubs/CompanyGatewayStub";
// import Environment from "diflow/lib/application/Environment";

// Environment.setAuthGateway(new AuthGatewayStub());
// Environment.setCompanyGateway(new CompanyGatewayStub());
// CertificateService.getCertificatesStrategy = new MockCryptoProGetCertificatesStrategy(certs_mock);
// CertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(
//   diff_mock_all_active
// );
// // Breaks storybooks knobs
// // Date.now = () => new Date("2000-12-04T08:33:00.000Z").getTime();

// storiesOf("Integration|CertificateItem", module)
//   .addDecorator(story => (
//     <React.Fragment>
//       <MemoryRouter initialEntries={[AUTH_CERT]}>{story()}</MemoryRouter>
//       <FlashContainer />
//     </React.Fragment>
//   ))
//   .add("all certs disabled", () => {
//     // Breaks storybooks knobs
//     // Date.now = () => new Date("2050-12-04T08:33:00.000Z");
//     return (
//       <React.Fragment>
//         <h1>Текущая дата - 2050-12-04T08:33:00.000Z</h1>
//         <LoginByCertForm />
//       </React.Fragment>
//     );
//   })
//   .add("all certs enabled", () => {
//     // Breaks storybooks knobs
//     // Date.now = () => new Date("2000-12-04T08:33:00.000Z");
//     return (
//       <React.Fragment>
//         <h1>Текущая дата - 2000-12-04T08:33:00.000Z</h1>
//         <LoginByCertForm />
//       </React.Fragment>
//     );
//   });
