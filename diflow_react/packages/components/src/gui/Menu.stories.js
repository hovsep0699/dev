// import React from "react";
// import { storiesOf } from "@storybook/react";
// import { withKnobs, object } from "@storybook/addon-knobs";
// import { MemoryRouter } from "react-router-dom";
// import Menu from "../../src/common/menu/Menu";
// import LogoButton from "../../src/common/menu/LogoButton";
// import ExitButton from "../../src/common/menu/ExitButton";
// import GlobalNav from "../../src/common/menu/GlobalNav";
// import GlobalNavItem from "../../src/common/menu/GlobalNavItem";
// import { ICO } from "../../src/common/Icons";

// function renderMenuItems(items) {
//   return items.map((item, index) => {
//     return (
//       <GlobalNavItem
//         path={item.path}
//         title={item.title}
//         icon={item.iconClass}
//         key={index}
//       />
//     );
//   });
// }

// storiesOf("COMMON|Menu", module)
//   .addDecorator(withKnobs)
//   .addDecorator(story => (
//     <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
//   ))
//   .add("Default", () => <Menu />)
//   .add("Customizable", () => {
//     const label = "Array of objects to build custom menu";
//     const defaultValue = [
//       {
//         title: "Документы",
//         path: "/document",
//         iconClass: ICO.files
//       },
//       {
//         title: "Кабинет",
//         path: "/cabinet",
//         iconClass: ICO.user
//       },
//       {
//         title: "Компания",
//         path: "/company",
//         iconClass: ICO.bag
//       },
//       {
//         title: "Система",
//         path: "/system",
//         iconClass: ICO.package
//       },
//       {
//         title: "Контрагенты",
//         path: "/contractor",
//         iconClass: ICO.bookmark
//       },
//       {
//         title: "Финансы",
//         path: "/tariff/financial_information",
//         iconClass: ICO.wallet
//       },
//       {
//         title: "Тарифы",
//         path: "/tariff",
//         iconClass: ICO.briefcase
//       }
//     ];
//     const groupId = "Menu";
//     const value = object(label, defaultValue, groupId);
//     return (
//       <div id="header">
//         <LogoButton path="/" />
//         <GlobalNav>{renderMenuItems(value)}</GlobalNav>
//         <ExitButton />
//       </div>
//     );
//   });
