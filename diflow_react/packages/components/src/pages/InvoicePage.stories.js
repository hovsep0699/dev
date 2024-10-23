// import React from "react";
// import { storiesOf } from "@storybook/react";
// import InvoicePage from "../../src/invoice/Page";
// import { MemoryRouter } from "react-router-dom";
// import { NEW_INVOICE_UTD } from "../../src/common/Url";
// import FlashContainer from "../../src/common/flash/components/Container";
// import Core from "diflow/lib/application/Core";
// import { createModalEnvironment } from "../modals/Helper";
// import Environment from "diflow/lib/application/Environment";
// import AuthCompanyULCompleteStub from "diflow/lib/application/auth/stubs/AuthCompanyULCompleteStub";
// import CompanyGatewayStub from "diflow/lib/application/company/stubs/CompanyGatewayStub";
// import AutocompleteGatewayStub from "diflow/lib/application/autocomplete/stubs/AutocompleteGatewayStub";

// Environment.setAuthGateway(new AuthCompanyULCompleteStub());
// Environment.setCompanyGateway(new CompanyGatewayStub());
// Environment.setAutocompleteGateway(new AutocompleteGatewayStub());

// Core.init().then(() => {
//   storiesOf("Pages|Invoice", module)
//     .addDecorator(story => (
//       <React.Fragment>
//         <MemoryRouter initialEntries={[NEW_INVOICE_UTD]}>{story()}</MemoryRouter>
//         <FlashContainer />
//       </React.Fragment>
//     ))
//     .add("create", () => {
//       createModalEnvironment();
//       return <InvoicePage />;
//     });
// });
