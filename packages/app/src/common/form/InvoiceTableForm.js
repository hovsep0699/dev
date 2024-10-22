import React from 'react';
// TODO в import-ax ccылки на upd (хотя та же самая форма используется для счёта фактуры invoice_utd)
import Good from '@distate/core/dist/domain/documents/upd/vo/Good';
import GoodName from '@distate/core/dist/domain/documents/upd/vo/good/Name';
import GoodNum from '@distate/core/dist/domain/documents/upd/vo/good/Num';
import Measurement from '@distate/core/dist/domain/documents/upd/vo/measurement/Measurement';
import PricePerUnit from '@distate/core/dist/domain/documents/upd/vo/good/PricePerUnit';
import Excise from '@distate/core/dist/domain/documents/upd/vo/good/Excise';
import TaxRate from '@distate/core/dist/domain/common/document/TaxRate';
import CostBeforeTax from '@distate/core/dist/domain/documents/upd/vo/good/CostBeforeTax';
import TotalCostBeforeTax from '@distate/core/dist/domain/documents/upd/vo/total/TotalCostBeforeTax';
import CostAfterTax from '@distate/core/dist/domain/documents/upd/vo/good/CostAfterTax';
import TotalCostAfterTax from '@distate/core/dist/domain/documents/upd/vo/total/TotalCostAfterTax';
import AmountOfTax from '@distate/core/dist/domain/documents/upd/vo/good/AmountOfTax';
import TotalAmountOfTax from '@distate/core/dist/domain/documents/upd/vo/total/TotalAmountOfTax';
import GoodInformation from '@distate/core/dist/domain/documents/upd/vo/good/GoodInformation';
import Behavior from './parameters/Behavior';
import MeasurementCode from '@distate/core/dist/domain/documents/upd/vo/measurement/Code';
import InfoFieldFact2 from '@distate/core/dist/domain/documents/upd/vo/good/InfoFieldFact2';
import Appearance from './parameters/Appearance';
import { debounce } from 'throttle-debounce';
import get from 'get-value';
import { format as formatMoney } from '../../utils/MoneyUtil';
import InfoFieldModal from '../../pages/upd/forms/InfoFieldModal';
import GoodTraceabilityInfo from '@distate/core/dist/domain/documents/upd/vo/good/GoodTraceabilityInfo';
import GoodTraceabilityInfoModal from '../../pages/upd/forms/GoodTraceabilityInfoModal';
import GoodInformationModal from '../../pages/upd/forms/GoodInformationModal';

class InvoiceTableForm {
  static build(builder, serverResponse, responsePathEntry) {
    const elementsMap = {};
    const createTableRow = (elementsMap, builder) => (DomainVO, buildFn, aggregatedBy = null) => {
      elementsMap[DomainVO.field] = { build: buildFn.bind(builder) };
      if (aggregatedBy) {
        elementsMap[DomainVO.field].aggregatedBy = aggregatedBy;
      }
    };
    const createRow = createTableRow(elementsMap, builder);
    createRow(GoodName, builder.buildArrayGroupInput);
    createRow(GoodNum, builder.buildArrayGroupInput);
    createRow(Measurement, builder.buildArrayGroupAutocomplete);
    createRow(PricePerUnit, builder.buildArrayGroupInput);
    createRow(Excise, builder.buildArrayGroupInput);
    createRow(TaxRate, builder.buildArrayGroupSelect);
    createRow(CostBeforeTax, builder.buildArrayGroupInput, {
      build: builder.buildTableInput.bind(builder),
      domain: TotalCostBeforeTax
    });
    createRow(CostAfterTax, builder.buildArrayGroupInput, {
      build: builder.buildTableInput.bind(builder),
      domain: TotalCostAfterTax
    });
    createRow(AmountOfTax, builder.buildArrayGroupInput, {
      build: builder.buildTableInput.bind(builder),
      domain: TotalAmountOfTax
    });

    createRow(
      GoodInformation,
      builder.buildArrayGroupComponent(
        <GoodInformationModal setDataToComponentState={builder.setDataToComponentState} />
      )
    );

    createRow(
      InfoFieldFact2,
      builder.buildArrayGroupComponent(
        <InfoFieldModal setDataToComponentState={builder.setDataToComponentState} />
      )
    );

    createRow(
      GoodTraceabilityInfo,
      builder.buildArrayGroupComponent(
        <GoodTraceabilityInfoModal setDataToComponentState={builder.setDataToComponentState} />
      )
    );

    const footerConfig = {
      labels: ['Итого:'],
      initialFieldDomain: {
        value: get(serverResponse, `${responsePathEntry}.table.total`)
      }
    };
    const defaultTableFieldBehavior = new Behavior({ showErrorMsg: false });

    const recalculate = (index, isRemove = false) => {
      debounce(50, true, () => {
        const prefix = `${Good.field}[${index}]`;
        const num = builder.formApi.getValue(`${prefix}.${GoodNum.field}`);
        const price = builder.formApi.getValue(`${prefix}.${PricePerUnit.field}`);
        const taxRate = builder.formApi.getValue(`${prefix}.${TaxRate.field}`);
        const calculateTax = TaxRate.getCalculate(taxRate);

        const cost = num * price;
        const amountOfTax = calculateTax ? calculateTax(cost) : 0;
        const costAfterTax = cost + amountOfTax;
        builder.formApi.setValue(`${prefix}.${CostBeforeTax.field}`, cost);
        builder.formApi.setValue(`${prefix}.${AmountOfTax.field}`, amountOfTax);
        builder.formApi.setValue(`${prefix}.${CostAfterTax.field}`, costAfterTax);

        let goods = builder.formApi.getValue(Good.field);
        const sumCostBeforeTax = (acc, good) => acc + Number(good.costBeforeTax);
        const sumCostAfterTax = (acc, good) => acc + Number(good.costAfterTax);
        const sumAmountOfTax = (acc, good) => acc + Number(good.amountOfTax);

        if (isRemove === true) {
          goods = goods.filter((good, ind) => ind !== index);
        }

        const totalCostBeforeTax = formatMoney(goods.reduce(sumCostBeforeTax, 0));
        const totalCostAfterTax = formatMoney(goods.reduce(sumCostAfterTax, 0));
        const totalAmountOfTax = formatMoney(goods.reduce(sumAmountOfTax, 0));

        builder.formApi.setValue(`${TotalCostBeforeTax.field}`, totalCostBeforeTax);
        builder.formApi.setValue(`${TotalCostAfterTax.field}`, totalCostAfterTax);
        builder.formApi.setValue(`${TotalAmountOfTax.field}`, totalAmountOfTax);
      })();
    };

    const recalcBehavior = Behavior.mixin(defaultTableFieldBehavior, { onChange: recalculate });

    const measurementBehavior = Behavior.mixin(defaultTableFieldBehavior, {
      scope: MeasurementCode.field,
      componentStateAdditionalDataConfig: [
        {
          objectPath: 'measurementCode',
          acSelector: 'code'
        },
        {
          objectPath: 'information.measurementTitle',
          acSelector: 'title'
        }
      ]
    });
    const behaviors = {
      [GoodName.field]: defaultTableFieldBehavior,
      [GoodNum.field]: recalcBehavior,
      [Measurement.field]: measurementBehavior,
      [PricePerUnit.field]: recalcBehavior,
      [Excise.field]: defaultTableFieldBehavior,
      [TaxRate.field]: recalcBehavior,
      [CostBeforeTax.field]: defaultTableFieldBehavior,
      [CostAfterTax.field]: defaultTableFieldBehavior,
      [AmountOfTax.field]: defaultTableFieldBehavior,
      [GoodTraceabilityInfo.field]: new Behavior({
        customFieldName: 'information'
      })
    };
    const appearance = {
      [GoodName.field]: new Appearance({ width: 300 }),
      [Measurement.field]: new Appearance({ width: 140 }),
      [GoodNum.field]: new Appearance({ width: 60 }),
      [Excise.field]: new Appearance({ width: 60 }),
      [TaxRate.field]: new Appearance({ width: 100 }),
      [GoodInformation.field]: new Appearance({ width: 30, noCaption: true }),
      [InfoFieldFact2.field]: new Appearance({ width: 30, noCaption: true }),
      [GoodTraceabilityInfo.field]: new Appearance({ width: 30, noCaption: true })
    };
    builder.buildTable(
      Good,
      elementsMap,
      footerConfig,
      behaviors,
      appearance,
      Behavior.mixin(recalcBehavior, {
        initialFieldDomain: {
          value: get(serverResponse, `${responsePathEntry}.table`)
        }
      })
    );
  }
}

export default InvoiceTableForm;
