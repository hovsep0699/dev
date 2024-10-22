// import React from "react";
// import { storiesOf } from "@storybook/react";
// import CompanyPage from "../../src/company/Page";
// import { MemoryRouter } from "react-router-dom";
// import Environment from "diflow/lib/application/Environment";
// import AuthGatewayWaitingDataStub from "diflow/lib/application/auth/stubs/AuthCompanyULWaitDataStub";
// import CompanyGatewayStub from "diflow/lib/application/company/stubs/CompanyGatewayStub";
// import BankGatewayStub from "diflow/lib/domain/bank/stubs/BankGatewayStub";
// import IFNSGatewayStub from "diflow/lib/domain/ifns/stubs/IFNSGatewayStub";
// import AddressGatewayStub from "diflow/lib/domain/common/address/stubs/AddressGatewayStub";
// import { COMPANY_DETAILS } from "../../src/common/Url";
// import FlashContainer from "../../src/common/flash/components/Container";
// import Core from "diflow/lib/application/Core";
// import { createModalEnvironment } from "../modals/Helper";

// Environment.setAuthGateway(new AuthGatewayWaitingDataStub());
// Environment.setCompanyGateway(new CompanyGatewayStub());
// Environment.setBankGateway(new BankGatewayStub());
// Environment.setIFNSGateway(new IFNSGatewayStub());
// Environment.setAddressGateway(new AddressGatewayStub());

// Core.init().then(() => {
//   storiesOf("Pages|Company", module)
//     .addDecorator(story => (
//       <React.Fragment>
//         <MemoryRouter initialEntries={[COMPANY_DETAILS]}>{story()}</MemoryRouter>
//         <FlashContainer />
//       </React.Fragment>
//     ))
//     .add("waiting for data", () => {
//       createModalEnvironment();
//       return <CompanyPage />;
//     });
// });
