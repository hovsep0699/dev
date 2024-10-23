// import React from "react";
// import { storiesOf } from "@storybook/react";
// import AuthPage from "../../src/auth/Page";
// import { MemoryRouter } from "react-router-dom";
// import Environment from "diflow/lib/application/Environment";
// import AuthGatewayStub from "diflow/lib/application/auth/stubs/AuthGatewayStub";
// import { AUTH_LOGIN } from "../../src/common/Url";
// import FlashContainer from "../../src/common/flash/components/Container";

// storiesOf("Pages|Auth", module)
//   .addDecorator(story => (
//     <React.Fragment>
//       <MemoryRouter initialEntries={[AUTH_LOGIN]}>{story()}</MemoryRouter>
//       <FlashContainer />
//     </React.Fragment>
//   ))
//   .add("Login", () => {
//     Environment.setAuthGateway(new AuthGatewayStub());
//     return <AuthPage />;
//   });
