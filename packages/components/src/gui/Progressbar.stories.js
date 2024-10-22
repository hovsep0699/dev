// import React from "react";
// import { storiesOf } from "@storybook/react";
// import { withKnobs, object, boolean } from "@storybook/addon-knobs";
// import Progressbar from "../../src/common/progressbar/Progressbar";
// import ProgressbarNode from "../../src/common/progressbar/ProgressbarNode";

// function renderNodes(items) {
//   return items.map((item, index) => {
//     return (
//       <ProgressbarNode
//         title={item.title}
//         isActive={item.isActive || false}
//         key={index}
//       />
//     );
//   });
// }

// storiesOf("COMMON|Progressbar", module)
//   .addDecorator(withKnobs)
//   .addDecorator(story => (
//     <div style={{ maxWidth: "60vw", margin: "0 auto" }} className="clearfix">
//       {story()}
//     </div>
//   ))
//   .add("Default", () => (
//     <Progressbar isSmall>
//       <ProgressbarNode
//         title="Заполните email, реквизиты компании и адрес"
//         isActive
//         key={1}
//       />
//       <ProgressbarNode title="Отправьте информационное сообщение" key={2} />
//       <ProgressbarNode title="Подключение завершено" key={3} />
//     </Progressbar>
//   ))
//   .add("Customizable", () => {
//     const groupId = "Progressbar";
//     const isSmall = boolean("isSmall", true, groupId);
//     const nodesLabel = "Array of objects to build custom progressbar";
//     const defaultValue = [
//       {
//         title: "Заполните email, реквизиты компании и адрес",
//         isActive: true
//       },
//       {
//         title: "Отправьте информационное сообщение"
//       },
//       {
//         title: "Подключение завершено"
//       }
//     ];

//     const nodes = object(nodesLabel, defaultValue, groupId);
//     return <Progressbar isSmall={isSmall}>{renderNodes(nodes)}</Progressbar>;
//   });
