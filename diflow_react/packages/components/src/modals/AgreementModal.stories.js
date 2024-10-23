// import React from "react";
// import { storiesOf } from "@storybook/react";
// import AgreementModal from "../../src/auth/modals/AgreementModal";
// import mockParameters from "diflow/lib/mocks/200/parameters";
// import mockCert from "diflow/lib/mocks/certs/crypto_pro_certs";
// import { ddmmyyyy_hhmmss } from "../../src/utils/DateUtil";
// import { createModalEnvironment } from "./Helper";

// storiesOf("Modals|AgreementModal", module).add("Default", () => {
//   createModalEnvironment();
//   return (
//     <AgreementModal
//       txt={mockParameters.register_text}
//       checkboxTxt={mockParameters.register_checkbox}
//       title={mockParameters.register_title}
//       certSerialNumber={mockCert[0].SerialNumber}
//       certThumbprint={mockCert[0].Thumbprint}
//       certValidFromDate={ddmmyyyy_hhmmss(mockCert[0].ValidFromDate)}
//       certValidToDate={ddmmyyyy_hhmmss(mockCert[0].ValidToDate)}
//       agree={() => {}}
//       disagree={() => {}}
//       hide={() => {}}
//     />
//   );
// });
