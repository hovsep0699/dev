// import FormBase from "../../src/common/form/FormBase";
// import Core from "diflow/lib/application/Core";
// import DocumentFormBuilder from "../../src/common/form/documents/DocumentFormBuilder";
// import ParticipantFormBuilder from "../../src/common/form/ParticipantFormBuilder";
// import CargoFrom from "diflow/lib/domain/documents/upd/vo/invoice/CargoFrom";
// import CargoTo from "diflow/lib/domain/documents/upd/vo/invoice/CargoTo";
// import documentMock from "diflow/lib/mocks/upd/get_upd";

// class ParticipantFormStorybook extends FormBase {
//   createForm() {
//     const builder = new DocumentFormBuilder(this);
//     ParticipantFormBuilder.build(CargoFrom, builder, "cargoFrom.consignor", documentMock);
//     ParticipantFormBuilder.build(CargoTo, builder, "consignee", documentMock);
//     builder.buildLoader();
//     builder.buildSubmit("Submit");
//     builder.buildForm([]);
//     return builder.getForm();
//   }

//   makeSubmitRequest(data) {
//     return Core.setCompanyDetails(data);
//   }
// }

// export default ParticipantFormStorybook;
