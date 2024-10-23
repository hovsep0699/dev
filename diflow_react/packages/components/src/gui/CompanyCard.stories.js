// import React from "react";
// import { storiesOf } from "@storybook/react";
// import CompanyCard from "../../src/main/CompanyCard";
// import KPP from "diflow/lib/domain/legal_entity/vo/KPP";
// import OGRN from "diflow/lib/domain/legal_entity/vo/OGRN";
// import OGRNIP from "diflow/lib/domain/individual_entrepreneur/vo/OGRNIP";
// import INN_UL from "diflow/lib/domain/legal_entity/vo/INN";
// import INN_IP from "diflow/lib/domain/individual_entrepreneur/vo/INN";

// const companyULMock = {
//   type: "UL",
//   name: 'ООО "Глав Мастер"',
//   inn: new INN_UL("0917011540"),
//   ogrn: new OGRN("1080917003617"),
//   kpp: new KPP("565765675")
// };
// const companyIPMock = {
//   type: "IP",
//   name: "ИП Чекамеев Алексей Петрович",
//   inn: new INN_IP("132808730606"),
//   ogrnip: new OGRNIP("313132804400022")
// };

// storiesOf("COMMON|CompanyCard", module)
//   .addDecorator(story => (
//     <div style={{ maxWidth: "60vw", margin: "0 auto" }} className="clearfix">
//       <div className="col-6">{story()}</div>
//     </div>
//   ))
//   .add("Legal entity", () => {
//     return <CompanyCard company={companyULMock} />;
//   })
//   .add("Individual enterpreneur", () => {
//     return <CompanyCard company={companyIPMock} />;
//   });
