// import React from "react";
// import { storiesOf } from "@storybook/react";
// import Flash from "../../src/common/flash/Flash";
// import FlashContainer from "../../src/common/flash/components/Container";
// import centered from "@storybook/addon-centered/react";
// import MESSAGE_MD from "./Message.md";
// import MessageDisplayStrategy from "../../src/common/flash/strategies/MessageDisplayStrategy";
// import MacroStrategy from "../../src/common/flash/strategies/MacroStrategy";
// import ConsoleStrategy from "../../src/common/flash/strategies/ConsoleStrategy";

// storiesOf("Common|FlashMessage", module)
//   .addDecorator(centered)
//   .add(
//     "Error 5sec",
//     () => {
//       setTimeout(() => {
//         Flash.error("Show one error message for 5 seconds");
//       }, 100);
//       return <FlashContainer />;
//     },
//     {
//       notes: {
//         markdown: MESSAGE_MD
//       }
//     }
//   )
//   .add(
//     "Error 1sec",
//     () => {
//       setTimeout(() => {
//         Flash.displayStrategy = new MessageDisplayStrategy(1000);
//         Flash.error("Show one error message for 1 seconds");
//       }, 100);
//       return <FlashContainer />;
//     },
//     {
//       notes: {
//         markdown: MESSAGE_MD
//       }
//     }
//   )
//   .add(
//     "Success 1sec",
//     () => {
//       setTimeout(() => {
//         Flash.displayStrategy = new MessageDisplayStrategy(1000);
//         Flash.success("Show one success message for 1 seconds");
//       }, 100);
//       return <FlashContainer />;
//     },
//     {
//       notes: {
//         markdown: MESSAGE_MD
//       }
//     }
//   )
//   .add(
//     "Info 1sec",
//     () => {
//       setTimeout(() => {
//         Flash.displayStrategy = new MessageDisplayStrategy(1000);
//         Flash.info("Show one info message for 1 seconds");
//       }, 100);
//       return <FlashContainer />;
//     },
//     {
//       notes: {
//         markdown: MESSAGE_MD
//       }
//     }
//   )
//   .add(
//     "Macro strategy",
//     () => {
//       setTimeout(() => {
//         Flash.displayStrategy = new MacroStrategy([
//           new MessageDisplayStrategy(3000),
//           new ConsoleStrategy()
//         ]);
//         Flash.info(
//           "Show one info message for 3 seconds and write this message in console"
//         );
//       }, 100);
//       return <FlashContainer />;
//     },
//     {
//       notes: {
//         markdown: MESSAGE_MD
//       }
//     }
//   );
