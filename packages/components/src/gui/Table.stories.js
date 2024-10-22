// import React from "react";
// import { storiesOf } from "@storybook/react";
// import { array, withKnobs } from "@storybook/addon-knobs";
// import { withInfo } from "@storybook/addon-info";
// import centered from "@storybook/addon-centered/react";
// import TableBase from "../../src/common/table/TableBase";
// import autobind from "autobind-decorator";
// import Row from "../../src/common/table/TableRow";
// import Cell from "../../src/common/table/TableCell";
// import TableHead from "../../src/common/table/TableHead";
// import THCell from "../../src/common/table/TableHeadCell";
// import dataWithContainer from "diflow/lib/mocks/table/200/table_item_container";
// import dataEmpty from "diflow/lib/mocks/table/200/table_empty_rows";

// class StoriesTable extends TableBase {
//   constructor(props) {
//     super(props);
//   }
//   @autobind
//   successDataHandler(tableData) {
//     this.setState({
//       tableData: tableData.rows,
//       isUpdateBtnBusy: false,
//       totalRecordsNum: tableData.recordsTotal
//     });
//   }
//   @autobind
//   errorDataHandler(error) {
//     this.setState({
//       isUpdateBtnBusy: false
//     });
//   }
//   @autobind
//   async getTableData() {
//     const offset = this.getOffset();
//     let res = { ...this.props.data };
//     let records = [...this.props.data.rows];
//     if (records.length > this.state.limit) {
//       records = records.slice(offset, offset + this.state.limit);
//       res.rows = records;
//     }
//     return res;
//   }
//   @autobind
//   getLimitValues() {
//     return this.props.limitValues.map(val => Number(val));
//   }
//   @autobind
//   handleLimitChange(e) {
//     this.setState({ limit: Number(e.target.value) });
//   }
//   @autobind
//   renderRow(document, index) {
//     return (
//       <Row key={index}>
//         <Cell key="0">{document.to_company_name}</Cell>
//         <Cell key="1">
//           <span>{document.document_type_title}</span>
//           &nbsp;
//           <span>№{document.document_id}</span>
//         </Cell>
//         <Cell key="2">{document.package_state_system_name}</Cell>
//         <Cell key="3">{document.created_at}</Cell>
//         <Cell align="right" key="4">
//           <a>
//             <span className="ico ico-download"></span>
//           </a>
//         </Cell>
//         <Cell />
//       </Row>
//     );
//   }
//   @autobind
//   renderHead() {
//     return (
//       <TableHead>
//         <THCell>Контрагент</THCell>
//         <THCell>Документ</THCell>
//         <THCell>Статус</THCell>
//         <THCell>Дата создания</THCell>
//         <THCell />
//         <THCell />
//       </TableHead>
//     );
//   }
//   render() {
//     return this.renderTable([25, 25, 15, 15, 10, 10]);
//   }
// }

// storiesOf("Common|Table", module)
//   .addDecorator(withKnobs)
//   .addDecorator(withInfo)
//   .addDecorator(centered)
//   .add("Default", () => {
//     const limits = array("Limits for records on page", [2, 5, 10]);
//     const wrapperStyles = {
//       width: "85%",
//       display: "block",
//       margin: "auto",
//       padding: "20px",
//       backgroundColor: "white"
//     };
//     return (
//       <div style={wrapperStyles}>
//         <StoriesTable limitValues={limits} data={dataWithContainer} />
//       </div>
//     );
//   })
//   .add("Empty", () => {
//     const wrapperStyles = {
//       width: "85%",
//       display: "block",
//       margin: "auto",
//       padding: "20px",
//       backgroundColor: "white"
//     };
//     return (
//       <div style={wrapperStyles}>
//         <StoriesTable limitValues={[10, 20, 50]} data={dataEmpty} />
//       </div>
//     );
//   });
