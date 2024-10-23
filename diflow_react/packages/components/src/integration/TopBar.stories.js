// import React from "react";
// import TopBar from "../../src/common/topbar/TopBar";
// import { storiesOf } from "@storybook/react";
// import { withKnobs } from "@storybook/addon-knobs";
// import { withInfo } from "@storybook/addon-info";
// import Environment from "diflow/lib/application/Environment";
// import NotificationsGatewayStub from "diflow/lib/application/notifications/stubs/NotificationGatewayStub";
// import NotificationGatewayContractStub from "diflow/lib/application/notifications/stubs/NotificationGatewayContractStub";

// storiesOf("Integration|TopBar", module)
//   .addDecorator(withKnobs)
//   .addDecorator(withInfo)
//   .add("Default", () => {
//     Environment.setNotificationsGateway(new NotificationsGatewayStub());
//     return <TopBar heading="Your title here" />;
//   })
//   .add("Contract Notifications", () => {
//     Environment.setNotificationsGateway(new NotificationGatewayContractStub());
//     return <TopBar heading="Contract Notifications" />;
//   });
