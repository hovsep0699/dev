import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Button, Input } from '@distate/components';
import { ContractorTypes, DestinationType } from '../../../helpers/contractors.typings';
import { ALLOWED_ONLY_NUMBER_ERROR, EMPTY_VALUE_ERROR } from '../../../../../common/Lbl';
import { getFoundLocalRoamingCompany } from '../../../store/actions';
import { selectSearch } from '../../../store/selectors';

type Args = {
  inn: string;
};

/** Форма поиска ЮЛ в локальном роуминге */
export const DestinationLocalRoamingForm = () => {
  const dispatch = useDispatch();

  const innErr = useSelector(selectSearch).errors?.messages?.inn?.errors;

  const onSubmit = (args: Args) => {
    dispatch(getFoundLocalRoamingCompany(args));
  };

  const validationsSchema = yup.object().shape({
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
          contractorType: ContractorTypes.legal_entity,
          destinationType: DestinationType.LoaclRoaming
        }}
        validateOnBlur
        onSubmit={values => onSubmit(values)}
        validationSchema={validationsSchema}
      >
        {({ values, handleSubmit, handleChange, setFieldTouched, touched, errors }) => (
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
            <br />
            <Button onClick={e => handleSubmit} type={`submit`}>
              Найти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
