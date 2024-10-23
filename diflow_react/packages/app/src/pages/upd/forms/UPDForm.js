import React from 'react';
import FormBase from '../../../common/form/FormBase';
import FormBuilder from '../../../common/form/documents/DocumentFormBuilder';

import Invoice from '@distate/core/dist/domain/documents/upd/vo/Invoice';
import DateInvoice from '@distate/core/dist/domain/documents/upd/vo/invoice/Date';
import NumInvoice from '@distate/core/dist/domain/documents/upd/vo/invoice/Num';

import Correct from '@distate/core/dist/domain/documents/upd/vo/Correct';
import DateCorrect from '@distate/core/dist/domain/documents/upd/vo/correct/Date';
import NumberCorrect from '@distate/core/dist/domain/documents/upd/vo/correct/Number';

import Currency from '@distate/core/dist/domain/documents/upd/vo/Currency';
import Recipient from '@distate/core/dist/domain/documents/upd/vo/recipient/Recipient';
import EconomicSubjectName from '@distate/core/dist/domain/documents/upd/vo/EconomicSubjectName';
import ExchangeRate from '@distate/core/dist/domain/documents/upd/vo/currency/ExchangeRate';

import Flash from '../../../common/flash/Flash';
import Core from '@distate/core/dist/application/Core';
import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';
import { SAVE, SUCCESS_SAVE_FORM } from '../../../common/Lbl';

import PaymentDocument from '@distate/core/dist/domain/documents/upd/vo/invoice/payment_document/PaymentDocument';
import CargoFrom from '@distate/core/dist/domain/documents/upd/vo/invoice/CargoFrom';
import CargoTo from '@distate/core/dist/domain/documents/upd/vo/invoice/CargoTo';
import Purpose from '@distate/core/dist/domain/documents/upd/vo/Purpose';
import InvoicePurpose from '@distate/core/dist/domain/documents/upd/vo/purpose/Invoice';
import WaybillPurpose from '@distate/core/dist/domain/documents/upd/vo/purpose/Waybill';
import InvoiceWaybillPurpose from '@distate/core/dist/domain/documents/upd/vo/purpose/InvoiceWaybill';

import Carrier from '@distate/core/dist/domain/documents/upd/vo/transfer/carrier/Carrier';
import Name from '@distate/core/dist/domain/documents/upd/vo/Name';

import InformationBasisType from '@distate/core/dist/domain/documents/upd/vo/invoice/InformationBasisType';
import ShipmentDocuments from '@distate/core/dist/domain/documents/upd/vo/invoice/ShipmentDocuments';
import BasisDocName from '@distate/core/dist/domain/documents/upd/standard_element/basis/DocName';
import BasisDocNumber from '@distate/core/dist/domain/documents/upd/standard_element/basis/DocNumber';
import BasisDocDate from '@distate/core/dist/domain/documents/upd/standard_element/basis/DocDate';
import BasisInformation from '@distate/core/dist/domain/documents/upd/standard_element/basis/Information';
import BasisDocId from '@distate/core/dist/domain/documents/upd/standard_element/basis/DocId';
import BasisDocNameEmptyOption from '@distate/core/dist/domain/documents/upd/standard_element/basis/DocNameEmptyOption';

import InfoFieldFact1 from '@distate/core/dist/domain/documents/upd/vo/invoice/InfoFieldFact1';

import BasisName from '@distate/core/dist/domain/documents/upd/vo/BasisName';

import styles from '../../../common/form/documents/DocumentFormBuilder.module.css';
import { TOP } from '../../../common/Placement';
import Behavior from '../../../common/form/parameters/Behavior';
import Appearance from '../../../common/form/parameters/Appearance';
import createError from '@distate/core/dist/application/error/ErrorFactory';
import autobind from 'autobind-decorator';
import { DOCUMENT_VIEW } from '../../../common/Url';
import { DOCUMENT as DOCUMENT_ERROR } from '@distate/core/dist/application/error/Error';
import PropTypes from 'prop-types';
import UPDService from '@distate/core/dist/application/documents/upd/UPDService';
import get from 'get-value';
import set from 'set-value';
import setObject from 'object-path';
import { set as setImmutable, wrap } from 'object-path-immutable';
import { clone, removeEmpty } from '../../../utils/ObjectUtil';
import { Loading } from '@distate/components';
import ParticipantForm from '../fields/ParticipantForm';
import Factor from '@distate/core/dist/domain/documents/upd/vo/factor/Factor';
import InvoiceTableForm from '../../../common/form/InvoiceTableForm';
import ArrayGroup from './ArrayGroup';
import PassedByForm from './PassedByForm';
import TransportationAndCargoModal from './TransportationAndCargoModal';
import TransportationAndCargo from '@distate/core/dist/domain/documents/upd/vo/transfer/TransportationAndCargo';
import skipArgs from '../../../utils/skipArgs';

import Environment from '@distate/core/dist/application/Environment';
import DivisionSelect from './DivisionSelect';
import Division from '@distate/core/dist/domain/documents/upd/vo/Division';

class UPDForm extends FormBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      redirectUrl: '',
      document: null,
      isLoading: !!props.id,
      isError: false,
      showSaveDocumentModal: false,
      errors: null,
      ...this.getDocumentTypeState(InvoicePurpose.value),
      paymentDocuments: [],
      infoFields: [],
      isExchangeRateFieldHidden: true,
      divisions: [],
      selectedDivision: null,
      transferDetails: null
    };

    this.isDocumentDuplicate = false;
    this.responsePathEntry = null;
    this.responcePathFirstSegment = null;
  }

  createForm() {
    const BASE_WIDTH = 460;
    const MARGIN = 6;
    const defaultBehavior = new Behavior();
    const defaultAppearance = new Appearance({ width: BASE_WIDTH + MARGIN });

    const builder = new FormBuilder(this, defaultBehavior, defaultAppearance);

    const requiredBehavior = new Behavior({ isRequired: true });

    const serverResponse = this.state.document;

    this.getCustomData(builder, serverResponse);
    this.getCustomGoodsData(builder, serverResponse);
    const getErrors = errorsObjPath => {
      return clone(get(builder._component, `state.errors.${errorsObjPath}`));
    };
    const clearFieldError = path => {
      let errors = get(builder._component, `state.errors.${path}`);
      if (Array.isArray(errors) && errors.length) {
        setObject(errors, `state.errors.${path}`, []);
        builder._component.setState({ errors });
      }
      if (typeof errors === 'string') {
        errors = get(builder._component, `state.errors`);
        const updatedErrors = setImmutable(errors, path, '');
        builder._component.setState({ errors: updatedErrors });
      }
    };

    const getBehavior = (defaultBehavior, path, scope = '') => {
      return serverResponse
        ? Behavior.mixin(defaultBehavior, {
            initialFieldDomain: {
              value: scope ? set({}, scope, get(serverResponse, path)) : get(serverResponse, path)
            }
          })
        : defaultBehavior;
    };

    const handleArrayGroupErrorsChange = path => newErrors => {
      const allErrors = clone(this.state.errors) || {};
      const updatedComponentStateErrors = set(allErrors, path, newErrors);
      this.setState({ errors: updatedComponentStateErrors });
    };

    builder.buildGroup(
      Invoice,
      {
        [NumInvoice.field]: builder.buildInput,
        [DateInvoice.field]: builder.buildDateInput
      },
      getBehavior(defaultBehavior, `${this.responsePathEntry}.invoice`),
      defaultAppearance,
      {
        [NumInvoice.field]: getBehavior(
          requiredBehavior,
          `${this.responsePathEntry}.invoice.number`
        ),
        [DateInvoice.field]: getBehavior(requiredBehavior, `${this.responsePathEntry}.invoice.date`)
      },
      {
        [NumInvoice.field]: new Appearance({
          width: BASE_WIDTH - 120,
          align: TOP
        }),
        [DateInvoice.field]: new Appearance({
          width: 120,
          customClasses: `ds-input ${styles.width100}`,
          align: TOP
        })
      }
    );

    builder.buildGroup(
      Correct,
      {
        [NumberCorrect.field]: builder.buildInput,
        [DateCorrect.field]: builder.buildDateInput
      },
      getBehavior(defaultBehavior, `${this.responsePathEntry}.invoice.correction`),
      defaultAppearance,
      {
        [NumberCorrect.field]: getBehavior(
          defaultBehavior,
          `${this.responsePathEntry}.invoice.correction.number`
        ),
        [DateCorrect.field]: getBehavior(
          defaultBehavior,
          `${this.responsePathEntry}.invoice.correction.date`
        )
      },
      {
        [NumberCorrect.field]: new Appearance({
          width: BASE_WIDTH - 120,
          align: TOP
        }),
        [DateCorrect.field]: new Appearance({
          width: 120,
          customClasses: `ds-input ${styles.width100}`,
          align: TOP
        })
      }
    );

    const getPurpose = () => {
      if (serverResponse) {
        switch (get(serverResponse, `${this.responcePathFirstSegment}.purpose`)) {
          case InvoicePurpose.value:
            return InvoicePurpose;
          case WaybillPurpose.value:
            return WaybillPurpose;
          case InvoiceWaybillPurpose.value:
            return InvoiceWaybillPurpose;
          default:
            return InvoicePurpose;
        }
      } else {
        return InvoicePurpose;
      }
    };

    const onPurposeChange = purpose => {
      this.setState(this.getDocumentTypeState(purpose));
    };
    const purposeBehavior = new Behavior({
      initialFieldDomain: getPurpose(),
      onChange: onPurposeChange,
      isRequired: true
    });
    builder.buildSelect(Purpose, purposeBehavior);

    builder.content.push(() => (
      <ArrayGroup
        domainVO={PaymentDocument}
        initialValues={this.state.paymentDocuments}
        returnState={paymentDocuments => this.setState({ paymentDocuments })}
        hasFixedWidthFields
        inputGroupWidth="466px"
        errors={getErrors(PaymentDocument.field)}
        handleErrorsChange={handleArrayGroupErrorsChange(PaymentDocument.field)}
      />
    ));

    const companyINN = Core.company?.inn?.value ? `, ИНН: ${Core.company?.inn?.value}` : '';
    const companyKPP = Core.company?.kpp?.value ? `, КПП: ${Core.company?.kpp?.value}` : '';
    const economicSubjectNameInitialValue = serverResponse
      ? get(serverResponse, `${this.responsePathEntry}.economicSubjectName`)
      : `${Core.company?.name}${companyINN}${companyKPP}`;

    const economicSubjectNameBehavior = new Behavior({
      initialFieldDomain: {
        value: economicSubjectNameInitialValue
      },
      isRequired: true
    });

    const hasDivisions = this.state.divisions.length > 1;

    builder.content.push(() => (
      <DivisionSelect
        DomainVO={Division}
        options={this.state.divisions}
        selected={this.state.selectedDivision}
        returnState={selectedDivision => this.setState({ selectedDivision })}
        isVisible={hasDivisions}
      />
    ));

    builder.buildInfo(EconomicSubjectName, economicSubjectNameBehavior, undefined, hasDivisions);

    const filterLegalEntities = res => res.filter(item => item.type === 'division');
    builder.buildAutocomplete(
      Recipient,
      getBehavior(
        new Behavior({ isRequired: true, onChange: () => clearFieldError(Recipient.field) }),
        `${Recipient.field}.title`
      ),
      ...skipArgs(2),
      filterLegalEntities
    );

    const setDataToFormState = path => data => {
      set(builder.formState, `values.${path}`, data, { merge: true });
    };

    builder.content.push(() => (
      <ParticipantForm
        DomainVO={Factor}
        setDataToFormState={setDataToFormState('information')}
        initialValues={{
          factor: get(serverResponse, `${this.responsePathEntry}.invoice.information.factor`)
        }}
        errors={{ factor: getErrors('information.factor') }}
        clearFieldError={clearFieldError}
      />
    ));

    const cargoFromInitialValues = get(
      serverResponse,
      `${this.responsePathEntry}.invoice.cargoFrom`
    );
    builder.content.push(() => (
      <ParticipantForm
        DomainVO={CargoFrom}
        setDataToFormState={setDataToFormState('invoice.cargoFrom')}
        scope={'consignor'}
        initialValues={
          this.isDocumentDuplicate ? cargoFromInitialValues[0] : cargoFromInitialValues
        }
        errors={getErrors('invoice.cargoFrom')}
        clearFieldError={clearFieldError}
      />
    ));

    const consigneeInitialValues = get(
      serverResponse,
      `${this.responsePathEntry}.invoice.consignee${this.isDocumentDuplicate ? 's' : ''}`
    );
    builder.content.push(() => (
      <ParticipantForm
        DomainVO={CargoTo}
        setDataToFormState={setDataToFormState('invoice')}
        scope={'consignee'}
        initialValues={{
          consignee: this.isDocumentDuplicate ? consigneeInitialValues[0] : consigneeInitialValues
        }}
        errors={{ consignee: getErrors('consignee') }}
        clearFieldError={clearFieldError}
      />
    ));

    builder.content.push(() => (
      <ParticipantForm
        DomainVO={Carrier}
        setDataToFormState={setDataToFormState('transferDetails.transportation')}
        customClasses={this.state.isInvoice ? styles.hiddenAndZeroHeight : ''}
        initialValues={{
          carrier: get(
            serverResponse,
            `${this.responsePathEntry}.waybill.transferDetails.transportation.carrier`
          )
        }}
        errors={{ carrier: getErrors('transferDetails.transportation.carrier') }}
        clearFieldError={clearFieldError}
      />
    ));

    builder.content.push(() => (
      <PassedByForm
        setDataToFormState={setDataToFormState('transferDetails')}
        customClasses={this.state.isInvoice ? styles.hiddenAndZeroHeight : ''}
        initialValues={{
          passedBy: get(
            serverResponse,
            `${this.responsePathEntry}.waybill.transferDetails.passedBy`
          )
        }}
        errors={{ passedBy: getErrors('transferDetails.passedBy') }}
        clearFieldError={clearFieldError}
      />
    ));

    const clearTransportationAndCargoModalState = () => {
      const updatedDocument = wrap(this.state.document)
        .set('formData.document.waybill.transferDetails.operationInformation', null)
        .set('formData.document.waybill.transferDetails.basis', null)
        .value();

      this.setState({
        document: updatedDocument,
        transferDetails: null
      });
    };

    // setDataToFormState('transferDetails')
    // setDataToFormState={transferDetails =>
    //   this.setState({
    //     transferDetails
    //   })
    // }

    builder.content.push(() => (
      <TransportationAndCargoModal
        DomainVO={TransportationAndCargo}
        setDataToFormState={transferDetails =>
          this.setState({
            transferDetails
          })
        }
        customClasses={this.state.isInvoice ? styles.hiddenAndZeroHeight : ''}
        initialValues={{
          operationInformation: get(
            serverResponse,
            `${this.responsePathEntry}.waybill.transferDetails.operationInformation`
          ),
          basis: get(serverResponse, `${this.responsePathEntry}.waybill.transferDetails.basis`)
        }}
        errors={this.state.errors?.transferDetails}
        waybillError={this.state.errors?.waybill}
        clearFieldError={clearFieldError}
        clearParentState={clearTransportationAndCargoModalState}
      />
    ));

    const handleCurrencyChange = ({ letter_code }) => {
      clearFieldError(Currency.field);
      this.setState({
        isExchangeRateFieldHidden: letter_code === Currency.initialValue.letterCode.value
      });
    };
    const behaviorCurrency = new Behavior({
      initialFieldDomain: (serverResponse && serverResponse.currency) || Currency.initialValue,
      isRequired: true,
      onChange: handleCurrencyChange
    });
    builder.buildAutocomplete(Currency, behaviorCurrency);

    builder.buildInput(
      ExchangeRate,
      getBehavior(
        defaultBehavior,
        `${this.responsePathEntry}.invoice.information.currencyExchangeRate`
      ),
      new Appearance({
        ...defaultAppearance,
        customClasses: this.state.isExchangeRateFieldHidden ? styles.hiddenAndZeroHeight : ''
      })
    );

    builder.buildInput(
      Name,
      getBehavior(defaultBehavior, `${this.responsePathEntry}.name`),
      new Appearance({
        ...defaultAppearance,
        customClasses: !this.state.isWaybill ? styles.hiddenAndZeroHeight : '',
        withRequiredView: true
      })
    );

    const DATE_WIDTH = 120;
    const basisBehaviors = {
      [BasisDocName.field]: defaultBehavior,
      [BasisDocNumber.field]: defaultBehavior,
      [BasisDocDate.field]: defaultBehavior,
      [BasisInformation.field]: defaultBehavior,
      [BasisDocId.field]: defaultBehavior
    };
    const basisFieldsAppearance = new Appearance({
      width: (2 * BASE_WIDTH - DATE_WIDTH - 3 * MARGIN) / 4,
      align: TOP,
      customClasses: `ds-input ${styles.width100}`
    });
    const basisAppearances = {
      [BasisDocName.field]: basisFieldsAppearance,
      [BasisDocNumber.field]: basisFieldsAppearance,
      [BasisDocDate.field]: new Appearance({
        width: DATE_WIDTH,
        align: TOP,
        customClasses: `ds-input ${styles.width100}`
      }),
      [BasisInformation.field]: basisFieldsAppearance,
      [BasisDocId.field]: basisFieldsAppearance
    };

    builder.content.push(() => (
      <ArrayGroup
        domainVO={InfoFieldFact1}
        initialValues={this.state.infoFields}
        returnState={infoFields => this.setState({ infoFields })}
        hasFixedWidthFields
        inputGroupWidth="466px"
        errors={getErrors(InfoFieldFact1.field)}
        handleErrorsChange={handleArrayGroupErrorsChange(InfoFieldFact1.field)}
      />
    ));

    builder.buildInput(
      BasisName,
      getBehavior(defaultBehavior, `${this.responsePathEntry}.basisName`),
      defaultAppearance
    );

    builder.buildGroup(
      InformationBasisType,
      {
        [BasisDocName.field]: builder.buildInput,
        [BasisDocNumber.field]: builder.buildInput,
        [BasisDocDate.field]: builder.buildDateInput,
        [BasisInformation.field]: builder.buildInput,
        [BasisDocId.field]: builder.buildInput
      },
      getBehavior(defaultBehavior, `${this.responsePathEntry}.invoice.information.basis`),
      defaultAppearance,
      basisBehaviors,
      basisAppearances
    );

    /** Документ об отгрузке */
    builder.buildGroup(
      ShipmentDocuments,
      {
        [BasisDocName.field]: builder.buildInput,
        [BasisDocNumber.field]: builder.buildInput,
        [BasisDocDate.field]: builder.buildDateInput,
      },
      getBehavior(defaultBehavior, `${this.responsePathEntry}.shipmentDocuments`),
      defaultAppearance,
      basisBehaviors,
      basisAppearances
    );

    InvoiceTableForm.build(builder, serverResponse, this.responsePathEntry);
    builder.buildLoader();
    builder.buildSubmit(SAVE, null, getErrors('global'));
    builder.buildForm();

    return builder.getForm();
  }

  @autobind
  showServerErrorsInForm(data, errorCb = null) {
    if (data[0]) {
      Flash.error(data[0]);
    }
    if (errorCb) errorCb(data);
  }

  makeSubmitRequest(data) {
    return this.state.document && this.props.isEdit
      ? UPDService.edit(this.state.document.id, data)
      : UPDService.create(data);
  }

  @autobind
  handleError(data) {
    const errors = {};
    const document = 'messages.document';
    const invoice = 'messages.document.invoice';
    const consignee = 'messages.document.invoice.consignee';
    const consignor = 'messages.document.invoice.cargoFrom.consignor';
    const goods = 'messages.document.table.goods';
    const waybill = 'messages.document.waybill';

    const purposeError = get(data, `messages.purpose.errors`);
    if (purposeError) errors.purpose = purposeError[0];

    const toError = get(data, `messages.to.errors`);
    if (toError) errors.recipient = toError[0];

    const economicSubjectNameError = get(data, `${document}.economicSubjectName.errors`);
    if (economicSubjectNameError) errors.economicSubjectName = economicSubjectNameError[0];

    const signorPositionError = get(data, `${document}.signor.position.errors`);
    if (signorPositionError) {
      signorPositionError.unshift('Заполните поле Должность в разделе Кабинет');
      this.showServerErrorsInForm(signorPositionError);
      errors.global = signorPositionError[0];
    }

    const nameError = get(data, `${document}.name.errors`);
    if (nameError) errors.name = nameError[0];

    const numberError = get(data, `${invoice}.number.errors`);
    if (numberError) errors.number = numberError[0];

    const dateError = get(data, `${invoice}.date.errors`);
    if (dateError) errors.date = dateError[0];

    const paymentDocumentsError = get(data, `${invoice}.paymentDocuments.errors`);
    if (paymentDocumentsError) {
      set(errors, 'invoice.paymentDocuments', paymentDocumentsError[0]);
    }

    const paymentDocumentsElementsErrors = get(data, `${invoice}.paymentDocuments`);
    if (paymentDocumentsElementsErrors) {
      set(errors, 'invoice.paymentDocuments', paymentDocumentsElementsErrors);
    }

    const consignorErrors = get(data, consignor);
    if (consignorErrors) {
      set(errors, 'cargoFrom.consignor', consignorErrors);
    }

    const consigneeErrors = get(data, consignee);
    if (consigneeErrors) {
      set(errors, 'consignee', consigneeErrors);
    }

    const factorErrors = get(data, `${invoice}.information.factor`);
    if (factorErrors) {
      set(errors, 'information.factor', factorErrors);
    }

    const currencyCodeError = get(data, `${invoice}.currencyCode.errors`);
    if (currencyCodeError) errors.currency = currencyCodeError[0];

    const currencyNameError = get(data, `${invoice}.information.currencyName.errors`);
    if (currencyNameError) errors.currency = currencyNameError[0];

    const exchangeRateError = get(data, `${invoice}.information.currencyExchangeRate.errors`);
    if (exchangeRateError) errors.exchangeRate = exchangeRateError[0];

    const informationFieldsElementsErrors = get(
      data,
      `${invoice}.informationField.attributeValues`
    );

    if (informationFieldsElementsErrors) {
      if (errors.invoice) {
        errors.invoice.informationField = {
          attributeValues: informationFieldsElementsErrors
        };
      } else {
        errors.invoice = {};
        errors.invoice.informationField = {
          attributeValues: informationFieldsElementsErrors
        };
      }
    }

    const waybillError = get(data, `${waybill}.errors`);
    if (waybillError) errors.waybill = waybillError[0];

    const operationInformationError = get(
      data,
      `${waybill}.transferDetails.operationInformation.errors`
    );
    if (operationInformationError) errors.operationInformation = operationInformationError[0];

    const transferDetailsBasisError = get(data, `${waybill}.transferDetails.basis`);
    if (transferDetailsBasisError) {
      set(errors, 'transferDetails.basis', transferDetailsBasisError);
    }
    const transferDetailsOperationInformationError = get(
      data,
      `${waybill}.transferDetails.operationInformation`
    );
    if (transferDetailsOperationInformationError) {
      set(errors, 'transferDetails.operationInformation', transferDetailsOperationInformationError);
    }
    const passedByErrors = get(data, `${waybill}.transferDetails.passedBy`);
    if (passedByErrors) {
      set(errors, 'transferDetails.passedBy', passedByErrors);
    }
    const carrierErrors = get(data, `${waybill}.transferDetails.transportation.carrier`);
    if (carrierErrors) {
      set(errors, 'transferDetails.transportation.carrier.', carrierErrors);
    }

    const informationBasisError = get(data, `${invoice}.information.basis.errors`);
    if (informationBasisError) {
      set(errors, 'information.basis', informationBasisError[0]);
    }

    const goodsErrors = get(data, `${goods}`);
    if (goodsErrors) {
      for (let item in goodsErrors) {
        if (goodsErrors[item].measurementCode) {
          goodsErrors[item].measurement = goodsErrors[item].measurementCode;
        }
      }
      errors.goods = goodsErrors;
    }
    this.setState({ showSaveDocumentModal: true, errors });
  }

  @autobind
  handleSubmitSuccess(res) {
    if (res.data && res.data.success) {
      const redirectUrl = DOCUMENT_VIEW.replace(':id', res.data.id);
      this.setState({
        isFormSentSuccessfully: true,
        isBusy: false,
        redirectUrl,
        errors: null,
        showSaveDocumentModal: false
      });
    }
  }

  getAutocompleteValue(DomainVO, formData) {
    const value = formData[DomainVO.field];
    if (!value) return Promise.resolve(null);
    if (this.fieldValueIsNotChosenFromDropdown(value)) {
      return AutocompleteService[DomainVO.field]
        .request(value)
        .then(AutocompleteService.handleUserInput(DomainVO));
    } else {
      return Promise.resolve(new DomainVO(value));
    }
  }

  sortArrayGroupData(data) {
    const sortedState = [];
    const sortedData = Object.values(data).reduce((itemsStore, item, index) => {
      itemsStore[index] = item;
      sortedState.push(item);
      return itemsStore;
    }, {});
    return { sortedData, sortedState };
  }

  formatBasisTypeFields(basisTypeFields) {
    if (!basisTypeFields) {
      return {
        0: {
          [BasisDocName.field]: BasisDocNameEmptyOption.title
        }
      };
    }

    const formattedBasisTypeFields = [];

    Object.values(basisTypeFields).forEach(el => {
      if (!el[BasisDocName.field]) {
        formattedBasisTypeFields.push({
          [BasisDocName.field]: BasisDocNameEmptyOption.title
        });
      } else {
        formattedBasisTypeFields.push(el);
      }
    });

    return formattedBasisTypeFields;
  }

  async processFormData(rawFormData) {
    try {
      delete rawFormData.paymentDocuments;
      const paymentDocumentsSorted = this.sortArrayGroupData(this.state.paymentDocuments);
      set(rawFormData, 'invoice.paymentDocuments', paymentDocumentsSorted.sortedData);
      this.setState({ paymentDocuments: paymentDocumentsSorted.sortedState });

      delete rawFormData.infoFields;
      const infoFieldsSorted = this.sortArrayGroupData(this.state.infoFields);
      set(rawFormData, 'invoice.informationField.attributeValues', infoFieldsSorted.sortedData);
      this.setState({ infoFields: infoFieldsSorted.sortedState });

      const formData = removeEmpty(rawFormData);
      const outputObj = {};

      outputObj.purpose = formData.purpose;
      outputObj.force = formData.force;
      outputObj.from = {
        division: this.state.selectedDivision.id ?? Core.company.mainDepartment.id
      };

      if (formData.recipient) {
        let division = undefined;
        if (typeof formData.recipient === 'string') {
          console.log('string recipient ', formData.recipient);
          const recipient = await this.getRecipientByTitle(formData.recipient);
          if (recipient) {
            division = Number(recipient.id);
          }
        }
        if (typeof formData.recipient === 'object' && formData.recipient.id) {
          console.log('object recipient ', formData.recipient);
          division = Number(formData.recipient.id);
        }
        if (division) {
          outputObj.to = { division };
        }
      }

      outputObj.document = {
        economicSubjectName: formData.economicSubjectName,
        basisName: formData.basisName
      };

      const invoice = formData.invoice || {};

      const information = formData.information || {};

      const shipmentDocuments = formData.shipmentDocuments;
      

      try {
        const currency = await this.getAutocompleteValue(Currency, formData);
        if (currency) {
          invoice.currencyCode = currency.code.value;
          information.currencyName = currency.title;
          if (formData.exchangeRate && !this.state.isExchangeRateFieldHidden) {
            information.currencyExchangeRate = formData.exchangeRate;
          }
        }
      } catch (error) {
        console.log(error);
      }

      if (shipmentDocuments) {
        invoice.shipmentDocuments = [shipmentDocuments];
      }

      const informationBasis = information?.basis;

      if (informationBasis) {
        information.basis = this.formatBasisTypeFields(informationBasis);
      }

      if (Object.keys(information).length) invoice.information = information;

      outputObj.document.invoice = invoice;

      
      const goods = formData.goods;

      goods.forEach(function(good) {
        if (good.measurementCode && (!good.information || !good.information.measurementTitle)) {
          if (!good.information) {
            good.information = {};
          }
          good.information.measurementTitle = good.measurementCode;
          good.measurementCode = '0000';
        }
      });

      if (goods) {
        const total = {};
        total.totalCostBeforeTax = formData.totalCostBeforeTax;
        total.totalCostAfterTax = formData.totalCostAfterTax;
        total.totalAmountOfTax = formData.totalAmountOfTax;
        outputObj.document.table = { goods, total };
      }

      if (
        formData.purpose !== InvoicePurpose.value &&
        (this.state.transferDetails || formData.operationInformation)
      ) {
        const waybill = {
          transferDetails: {}
        };

        if (this.state.transferDetails) {
          waybill.transferDetails = this.state.transferDetails;
          waybill.transferDetails.basis = this.formatBasisTypeFields(
            this.state.transferDetails.basis
          );
        }

        outputObj.document.waybill = waybill;
      }
      if (formData.purpose === WaybillPurpose.value && formData.name) {
        outputObj.document.name = formData.name;
      }

      return outputObj;
    } catch (error) {
      throw createError(DOCUMENT_ERROR, 'Ошибка processFormData для формы создания УПД.', error);
    }
  }

  renderRedirect(url) {
    window.location = url;
  }

  showSuccessMsg() {
    Flash.success(SUCCESS_SAVE_FORM);
  }

  async decorateCurrency(serverResponse) {
    const invoice = this.isDocumentDuplicate
      ? serverResponse.parameters.invoice
      : serverResponse.formData.document.invoice;
    const currencyCode = invoice.currencyCode;

    if (currencyCode) {
      let serverResponseCurrency = await AutocompleteService.currencyByCode.request(currencyCode);
      if (serverResponseCurrency.rows.length === 1) {
        serverResponse.currency = new Currency(serverResponseCurrency.rows[0]);
      }
    }
  }

  async getRecipientByTitle(title) {
    if (!title) return Promise.resolve(null);
    const recipient = await AutocompleteService.recipient
      .request(title)
      .then(recipients => {
        return recipients.rows.filter(item =>
          item.title.toLowerCase().includes(title.toLowerCase())
        );
      })
      .then(filteredRecipients => {
        if (filteredRecipients.length === 1) return filteredRecipients[0];
        const exactMatch = filteredRecipients.find(
          item => item.title.toLowerCase() === title.toLowerCase()
        );
        return exactMatch || null;
      });
    return recipient;
  }

  async decorateRecipient(serverResponse) {
    try { // исправление бага без возможности воспроизвести на рабочем стенде
      if (!serverResponse[this.responcePathFirstSegment]?.to) return;

      if (this.isDocumentDuplicate) {
        // TODO check buyers
        const resArr =serverResponse?.parameters?.invoice?.buyers || [];
        const { name, inn } = resArr[0] || {};
        const recipients = await AutocompleteService.recipient.request();
        const {rows = []} = recipients;
        serverResponse[Recipient.field] = rows.find(
          value => value.title.includes(name) || value.title.includes(inn)
        );
      } else {
        // TODO process person
        const { division } = serverResponse.formData.to;
        if (division) {
          const recipients = await AutocompleteService.recipient.request();
          serverResponse[Recipient.field] = recipients.rows.find(value => value.id === division);
        }
      }

    } catch (err) {
      console.log('err', err)
    }
    
  }

  async decorateMeasurement(serverResponse) {
    const goods = get(serverResponse, `${this.responsePathEntry}.table.goods`);
    if (!goods) return;
    let newServerResponse = serverResponse;
    goods.forEach((good, index) => {
      const measurementTitle = get(good, 'information.measurementTitle');
      newServerResponse = setImmutable(
        newServerResponse,
        `${this.responsePathEntry}.table.goods.${index}.measurementCode`,
        measurementTitle
      );
    });
    return newServerResponse;
  }

  getCustomGoodsData(builder, serverResponse) {
    const serverResponseGoods = get(serverResponse, `${this.responsePathEntry}.table.goods`);
    const localStateGoods = get(builder._component.state, 'goods');
    if (serverResponseGoods && !localStateGoods) {
      let newValuesForState = {};
      serverResponseGoods.forEach((good, index) => {
        const measurementTitle = get(
          builder._component.state,
          `goods.${index}.information.measurementTitle`
        );
        if (!measurementTitle) {
          const newMeasurementTitle = get(good, 'information.measurementTitle');
          if (newMeasurementTitle) {
            const newMeasurementData = {
              information: {
                measurementTitle: newMeasurementTitle
              },
              measurementCode: get(
                this.serverResponse,
                `${this.responsePathEntry}.table.goods.${index}.measurementCode`
              )
            };
            newValuesForState = setImmutable(
              newValuesForState,
              `goods.${index}`,
              newMeasurementData
            );
          }
        }

        const currentInfoFields = get(builder._component.state, `goods.${index}.infoFields`);
        if (!currentInfoFields || !Object.entries(currentInfoFields).length) {
          const newInfoFields = get(good, `infoFields`);
          if (newInfoFields && newInfoFields.length) {
            newValuesForState = setImmutable(
              newValuesForState,
              `goods.${index}.infoFields`,
              newInfoFields
            );
          }
        }

        const currentInformation = get(builder._component.state, `goods.${index}.information`);
        if (!currentInformation || !Object.entries(currentInformation).length) {
          const newInformation = get(good, `information`);
          if (newInformation) {
            newValuesForState = setImmutable(
              newValuesForState,
              `goods.${index}.information`,
              newInformation
            );
          }
        }

        const currentIdentificationNumbers = get(
          builder._component.state,
          `goods.${index}.information.identificationNumbers`
        );
        if (!currentIdentificationNumbers || !Object.entries(currentIdentificationNumbers).length) {
          const newIdentificationNumbers = get(good, `information.identificationNumbers`);
          if (newIdentificationNumbers && newIdentificationNumbers.length) {
            newValuesForState = setImmutable(
              newValuesForState,
              `goods.${index}.information.identificationNumbers`,
              newIdentificationNumbers
            );
          }
        }

        const currentTracking = get(
          builder._component.state,
          `goods.${index}.information.tracking`
        );
        if (!currentTracking || !Object.entries(currentTracking).length) {
          const newTracking = get(good, `information.tracking`);
          if (newTracking && newTracking.length) {
            newValuesForState = setImmutable(
              newValuesForState,
              `goods.${index}.information.tracking`,
              newTracking
            );
          }
        }
      });
      if (Object.entries(newValuesForState).length) {
        builder.setDataToComponentState({ ...newValuesForState });
      }
    }
  }

  getCustomData(builder, serverResponse) {
    const newValuesForState = {};
    let paymentDocuments = get(
      serverResponse,
      `${this.responsePathEntry}.invoice.paymentDocuments`
    );
    if (paymentDocuments) paymentDocuments = Object.entries(paymentDocuments);
    if (
      paymentDocuments &&
      paymentDocuments.length &&
      Object.entries(this.state.paymentDocuments).length === 0
    ) {
      newValuesForState.paymentDocuments = paymentDocuments;
    }
    let infoFields = get(
      serverResponse,
      `${this.responsePathEntry}.invoice.informationField.attributeValues`
    );
    if (infoFields) infoFields = Object.entries(infoFields);
    if (infoFields && infoFields.length && Object.entries(this.state.infoFields).length === 0) {
      newValuesForState.infoFields = infoFields;
    }
    if (Object.keys(newValuesForState).length) {
      this.setState({ ...newValuesForState });
    }
  }

  getDocumentTypeState(purpose) {
    return {
      isInvoice: purpose === InvoicePurpose.value,
      isWaybill: purpose === WaybillPurpose.value,
      isInvoiceWaybill: purpose === InvoiceWaybillPurpose.value
    };
  }

  async getData() {
    try {
      this.serverResponse = await UPDService.get(this.props.id);
      if (this.serverResponse.formData === null) this.isDocumentDuplicate = true;
      this.responsePathEntry = this.isDocumentDuplicate ? 'parameters' : 'formData.document';
      this.responcePathFirstSegment = this.isDocumentDuplicate ? 'parameters' : 'formData';
      await this.decorateCurrency(this.serverResponse);
      await this.decorateRecipient(this.serverResponse);
      let document = await this.decorateMeasurement(this.serverResponse);

      const formattedDivisions = await this.getDivisions();
      const [selectedDivision] = formattedDivisions.filter(
        division => division.id === get(this.serverResponse, 'formData.from.division')
      );

      this.setState({
        isLoading: false,
        isError: false,
        document,
        ...this.getDocumentTypeState(this.serverResponse[this.responcePathFirstSegment].purpose),
        paymentDocuments: get(
          this.serverResponse,
          `${this.responsePathEntry}.invoice.paymentDocuments`
        ),
        infoFields: get(
          this.serverResponse,
          `${this.responsePathEntry}.invoice.informationField.attributeValues`
        ),
        isExchangeRateFieldHidden:
          this.serverResponse?.currency?.letterCode?.value ===
          Currency.initialValue.letterCode.value,
        divisions: formattedDivisions,
        selectedDivision
      });
    } catch (error) {
      console.log('error', error);
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  }

  async getDivisions(isNewDoc) {
    try {
      const divisions = await Environment.getCompanyGateway().getDivisions();

      const formattedDivisions = divisions.rows.map(division => {
        return {
          id: division.id,
          title: division.title
        };
      });

      formattedDivisions.forEach(item => {
        if (item.id === Core.company.mainDepartment.id) {
          formattedDivisions.splice(formattedDivisions.indexOf(item), 1);
          formattedDivisions.splice(0, 0, item);
        }
      });

      if (isNewDoc) {
        this.setState(() => ({
          divisions: formattedDivisions ?? [],
          selectedDivision: formattedDivisions[0]
        }));
      }
      return formattedDivisions;
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    if (this.props.id) {
      this.getData();
    } else {
      this.getDivisions(true);
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log('React error:', error);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO optimize performance
    return true;
  }

  render() {
    if (this.state.redirectUrl) {
      return this.renderRedirect(this.state.redirectUrl);
    }
    if (this.state.isLoading) return <Loading height="75vh" />;
    if (this.state.isError) return <span>Возникла ошибка</span>;
    return this.createForm();
  }
}

UPDForm.defaultValues = {
  id: null
};

UPDForm.propsTypes = {
  id: PropTypes.string
};

export default UPDForm;
