import React from 'react';
import { Formik, Form } from 'formik';
import { Box } from 'grommet';
import { InputField, SelectField, Button, Icons, ButtonKinds } from '@distate/components';
import changeIconFill from '../../../utils/changeIconFill';
import { APPLY, CANCEL } from '../../../common/Lbl';

const StyledIconCheck = changeIconFill(Icons.IconCheck);
const StyledIconClose = changeIconFill(Icons.IconClose);

const InboxSearchForm = () => {
  const documentFlowOptions = [
    { value: 'act', label: 'Акт сдачи-приема работ(услуг)' },
    { value: 'act_552', label: 'Акт по приказу ФНС 552' },
    { value: 'bilateral', label: 'Двусторонний документ' },
    { value: 'information_message', label: 'Информационное сообщение' },
    { value: 'waybill', label: 'Накладная' },
    { value: 'waybill_551', label: 'Накладная по приказу ФНС 551' },
    { value: 'unilateral', label: 'Односторонний документ' },
    { value: 'invoice', label: 'Счет-фактура (старый формат)' },
    { value: 'invoice_utd', label: 'Счет-фактура' },
    { value: 'invoice_correction_ucd', label: 'Корректировочный счет-фактура' },
    { value: 'bill', label: 'Счет на оплату' },
    { value: 'UTD', label: 'УПД' },
    { value: 'UTD_INVOICE', label: 'УПД (СЧФ)' },
    { value: 'UTD_WAYBILL', label: 'УПД (ДОП)' },
    { value: 'UTD_INVOICE_WAYBILL', label: 'УПД (СЧФ ДОП)' },
    { value: 'UCD_INVOICE', label: 'УКД (СЧФ)' },
    { value: 'UCD_WAYBILL', label: 'УКД (ДОП)' },
    { value: 'UCD_INVOICE_WAYBILL', label: 'УКД (СЧФ ДОП)' },
    { value: 'unformalized_unilateral_unsigned', label: 'Выставленные счета по ЭДО' }
  ];

  const handleSubmit = (values: { [key: string]: any }) => {};
  return (
    <Box align="center">
      <Formik
        initialValues={{
          contractor: '',
          documentFlows: ''
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputField name="contractor" label="Контрагент" hideErrors />
          <SelectField
            name="documentFlow"
            options={documentFlowOptions}
            label="Вид документа"
            isClearable={true}
            isSearchable={false}
            hideErrors
          />
          <Button type="submit" icon={<StyledIconCheck />} kind={ButtonKinds.Primary}>
            {APPLY}
          </Button>
          <Button type="reset" icon={<StyledIconClose />}>
            {CANCEL}
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default InboxSearchForm;
