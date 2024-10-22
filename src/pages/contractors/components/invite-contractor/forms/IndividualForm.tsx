import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Button, Input } from '@distate/components';
import { ContractorTypes } from '../../../helpers/contractors.typings';
import { ALLOWED_ONLY_NUMBER_ERROR, ALLOWED_ONLY_STRING_ERROR } from '../../../../../common/Lbl';
import { getFoundPerson } from '../../../store/actions';
import { selectSearch } from '../../../store/selectors';

type Args = {
  name?: string;
  surname?: string;
  patronymic?: string;
  /** СНИЛС */
  socialNumber?: string;
};

/** Форма поиска ФЛ */
export const IndividualForm = () => {
  const dispatch = useDispatch();

  const nameErr = useSelector(selectSearch).errors?.messages?.name?.errors;
  const surnameErr = useSelector(selectSearch).errors?.messages?.surname?.errors;
  const patronymicErr = useSelector(selectSearch).errors?.messages?.patronymic?.errors;
  const socialNumberErr = useSelector(selectSearch).errors?.messages?.socialNumber?.errors;

  const onSubmit = (args: Args) => {
    dispatch(getFoundPerson(args));
  };

  const validationsSchema = yup.object().shape({
    surname: yup.string().typeError(ALLOWED_ONLY_STRING_ERROR),
    name: yup.string().typeError(ALLOWED_ONLY_STRING_ERROR),
    patronymic: yup.string().typeError(ALLOWED_ONLY_STRING_ERROR),
    socialNumber: yup
      .number()
      .typeError(ALLOWED_ONLY_NUMBER_ERROR)
      .positive()
      .integer()
  });

  return (
    <div>
      <Formik
        initialValues={{
          surname: '',
          name: '',
          patronymic: '',
          socialNumber: '',
          contractorType: ContractorTypes.natural_entity
        }}
        validateOnBlur
        onSubmit={values => onSubmit(values)}
        validationSchema={validationsSchema}
      >
        {({ values, handleSubmit, handleChange, errors, touched, setFieldTouched }) => (
          <Form>
            <Input
              label="Фамилия"
              name="surname"
              value={values.surname}
              onChange={handleChange}
              error={(!!errors.surname && touched.surname) || surnameErr}
              errors={errors?.surname && touched.surname ? [errors.surname] : surnameErr}
              onBlur={() => setFieldTouched('surname', true)}
            />
            <Input
              label="Имя"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={(!!errors.name && touched.name) || nameErr}
              errors={errors?.name && touched.name ? [errors.name] : nameErr}
              onBlur={() => setFieldTouched('name', true)}
            />
            <Input
              label="Отчество"
              name="patronymic"
              value={values.patronymic}
              onChange={handleChange}
              error={(!!errors.patronymic && touched.patronymic) || patronymicErr}
              errors={
                errors?.patronymic && touched.patronymic ? [errors.patronymic] : patronymicErr
              }
              onBlur={() => setFieldTouched('patronymic', true)}
            />
            <Input
              label="СНИЛС"
              name="socialNumber"
              value={values.socialNumber}
              onChange={handleChange}
              error={(!!errors.socialNumber && touched.socialNumber) || socialNumberErr}
              errors={
                errors?.socialNumber && touched.socialNumber
                  ? [errors.socialNumber]
                  : socialNumberErr
              }
              onBlur={() => setFieldTouched('socialNumber', true)}
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
