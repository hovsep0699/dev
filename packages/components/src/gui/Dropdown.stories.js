// import React from "react";
// import { storiesOf } from "@storybook/react";
// import { withKnobs, radios, boolean } from "@storybook/addon-knobs";
// import { withInfo } from "@storybook/addon-info";
// import centered from "@storybook/addon-centered/react";
// import Button from "../../src/common/Button";
// import Dropdown from "../../src/common/dropdown/Dropdown";
// import * as placement from "../../src/common/Placement";

// storiesOf("COMMON|Dropdown", module)
//   .addDecorator(withInfo)
//   .addDecorator(withKnobs)
//   .addDecorator(centered)
//   .add("Dropdown", () => {
//     const arrow = boolean("Arrow", true);
//     const dropdownPositions = radios(
//       "Dropdown placement",
//       { ...placement },
//       placement.BOTTOM_LEFT
//     );
//     const dropdownTrigger = handleClick => (
//       <Button iconClass="icon-clone" onClick={handleClick}>
//         Документы
//       </Button>
//     );
//     const documents = [
//       "Акт сдачи-приёмки работ",
//       "Накладная",
//       "Неформализованный документ",
//       "Счёт на оплату"
//     ];
//     const dropdownItems = documents.map((doc, num) => (
//       <Dropdown.Item key={num} itemKey={num}>
//         <span className="droplink">{doc}</span>
//       </Dropdown.Item>
//     ));
//     return (
//       <Dropdown
//         noArrow={!arrow}
//         placement={dropdownPositions}
//         trigger={dropdownTrigger}
//       >
//         <Dropdown.Header>Документы</Dropdown.Header>
//         <Dropdown.Menu
//           onSelect={key =>
//             window.alert(`Кликнули на Dropdown.Item с key: ${key}`)
//           }
//         >
//           {dropdownItems}
//         </Dropdown.Menu>
//       </Dropdown>
//     );
//   });
