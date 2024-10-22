import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Button, Input } from '@distate/components';
import { ALLOWED_ONLY_NUMBER_ERROR, ALLOWED_ONLY_STRING_ERROR } from '../../../../../common/Lbl';
import { getFoundLocalCompany } from '../../../store/actions';
import { selectSearch } from '../../../store/selectors';

type Args = {
  inn?: string;
  name?: string;
};

/** Форма посика локального ЮЛ */
export const DestinationLocalForm = () => {
  const dispatch = useDispatch();

  const innErr = useSelector(selectSearch).errors?.messages?.inn?.errors;
  const nameErr = useSelector(selectSearch).errors?.messages?.name?.errors;

  const onSubmit = (args: Args) => {
    dispatch(getFoundLocalCompany(args));
  };

  const validationsSchema = yup.object().shape({
    title: yup.string().typeError(ALLOWED_ONLY_STRING_ERROR),
    inn: yup
      .number()
      .typeError(ALLOWED_ONLY_NUMBER_ERROR)
      .positive()
      .integer()
  });

  return (
    <div>
      <Formik
        initialValues={{
          inn: '',
          name: ''
        }}
        validateOnBlur
        onSubmit={values => onSubmit(values)}
        validationSchema={validationsSchema}
      >
        {({ values, handleSubmit, handleChange, errors, touched, setFieldTouched }) => (
          <Form>
            <Input
              label="ИНН"
              name="inn"
              value={values.inn}
              onChange={handleChange}
              error={(!!errors.inn && touched.inn) || innErr}
              errors={errors?.inn && touched.inn ? [errors.inn] : innErr}
              onBlur={() => setFieldTouched('fnsUid', true)}
            />
            <Input
              label="Название"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={(!!errors.name && touched.name) || nameErr}
              errors={errors?.name && touched.name ? [errors.name] : nameErr}
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
