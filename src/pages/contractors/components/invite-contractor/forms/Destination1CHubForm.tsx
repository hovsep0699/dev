import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Button, Input } from '@distate/components';
import { ContractorTypes, DestinationType } from '../../../helpers/contractors.typings';
import { ALLOWED_ONLY_NUMBER_ERROR, EMPTY_VALUE_ERROR } from '../../../../../common/Lbl';
import { createHub1cCompanyInvitation } from '../../../store/actions';
import { selectSearch } from '../../../store/selectors';

/** Форма приглашения ЮЛ в 1С-ЭДО */
export const Destination1CHubForm = () => {
  const dispatch = useDispatch();

  const innErr = useSelector(selectSearch).errors?.messages?.inn?.errors;
  const fnsUidErr = useSelector(selectSearch).errors?.messages?.fnsUid?.errors;

  type Hub1cCompanyPayload = {
    type: DestinationType;
    fnsUid: string;
    inn: string;
  };
  const onSubmit = (args: Hub1cCompanyPayload) => {
    dispatch(createHub1cCompanyInvitation(args));
  };

  const validationsSchema = yup.object().shape({
    fnsUid: yup
      .string()
      .min(4, 'Введите не менее 4 символов')
      .max(46, 'Допускается не более 46 символов'),
    inn: yup
      .number()
      .typeError(ALLOWED_ONLY_NUMBER_ERROR)
      .positive()
      .integer()
      .required(EMPTY_VALUE_ERROR)
  });

  return (
    <div>
      <Formik
        initialValues={{
          inn: '',
          fnsUid: '',
          contractorType: ContractorTypes.legal_entity,
          destinationType: DestinationType.Hub1c
        }}
        validateOnBlur
        onSubmit={values =>
          onSubmit({
            type: values.destinationType,
            fnsUid: values.fnsUid,
            inn: values.inn
          })
        }
        validationSchema={validationsSchema}
      >
        {({ values, handleSubmit, handleChange, setFieldTouched, errors, touched }) => (
          <Form>
            <Input
              required
              label="ИНН"
              name="inn"
              value={values.inn}
              onChange={handleChange}
              error={(!!errors.inn && touched.inn) || innErr}
              errors={errors?.inn && touched.inn ? [errors.inn] : innErr}
              onBlur={() => setFieldTouched('inn', true)}
            />
            <Input
              label="Идентификатор клиента"
              name="fnsUid"
              value={values.fnsUid}
              onChange={handleChange}
              error={(!!errors.fnsUid && touched.fnsUid) || fnsUidErr}
              errors={errors?.fnsUid && touched.fnsUid ? [errors.fnsUid] : fnsUidErr}
            />
            <br />
            <Button onClick={e => handleSubmit} type={`submit`}>
              Отправить приглашение
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
