// import React from "react";
// import { storiesOf } from "@storybook/react";
// import PageMenu from "../../src/common/menu/PageMenu";
// import PageMenuItem from "../../src/common/menu/PageMenuItem";
// import Menu from "../../src/common/menu/Menu";
// import { withKnobs, object, text } from "@storybook/addon-knobs";
// import { MemoryRouter } from "react-router-dom";

// function renderMenuItems(items) {
//   return items.map((item, index) => {
//     if (item.submenu) {
//       return (
//         <PageMenuItem path={item.path} title={item.title} key={index}>
//           <PageMenu>{renderMenuItems(item.submenu)}</PageMenu>
//         </PageMenuItem>
//       );
//     }
//     return <PageMenuItem path={item.path} title={item.title} key={index} />;
//   });
// }

// storiesOf("COMMON|PageMenu", module)
//   .addDecorator(withKnobs)
//   .addDecorator(story => (
//     <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
//   ))
//   .add("Default", () => {
//     const header = text("Заголовок", "Компания", "Header");
//     return (
//       <React.Fragment>
//         <Menu />
//         <PageMenu header={header}>
//           <PageMenuItem
//             path="/company/bank-detail"
//             title="Реквизиты компании"
//           />
//           <PageMenuItem path="/company/address" title="Юридический адрес" />
//           <PageMenuItem path="/company/staff" title="Сотрудники">
//             <PageMenu>
//               <PageMenuItem
//                 path="/company/staff/waiting"
//                 title="Заявки на активацию"
//               />
//               <PageMenuItem
//                 path="/company/staff/deactivated"
//                 title="Отключенные"
//               />
//             </PageMenu>
//           </PageMenuItem>
//           <PageMenuItem path="/company/roles" title="Роли сотрудников" />
//           <PageMenuItem path="/company/division" title="Подразделения" />
//         </PageMenu>
//       </React.Fragment>
//     );
//   })
//   .add("Customizable", () => {
//     const label = "Array of objects to build custom menu";
//     const defaultValue = [
//       {
//         title: "Реквизиты компании",
//         path: "/company/bank-details"
//       },
//       {
//         title: "Юридический адрес",
//         path: "/company/address"
//       },
//       {
//         title: "Сотрудники",
//         path: "/company/staff",
//         submenu: [
//           {
//             title: "Заявки на активацию",
//             path: "/company/staff/waiting"
//           },
//           {
//             title: "Отключенные",
//             path: "/company/staff/deactivated"
//           }
//         ]
//       },
//       {
//         title: "Роли сотрудников",
//         path: "/company/roles"
//       },
//       {
//         title: "Подразделения",
//         path: "/company/division"
//       }
//     ];
//     const groupId = "Menu";

//     const value = object(label, defaultValue, groupId);
//     const header = text("Заголовок", "Компания", "Header");

//     return (
//       <React.Fragment>
//         <Menu />
//         <PageMenu header={header}>{renderMenuItems(value)}</PageMenu>
//       </React.Fragment>
//     );
//   });
