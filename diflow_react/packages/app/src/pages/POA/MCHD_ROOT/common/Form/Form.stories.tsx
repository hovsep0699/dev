    import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box } from 'grommet';
import InputField from './fields/InputField';
import SelectField from './fields/SelectField';
import CheckboxField from './fields/CheckboxField';
import DateInputField from './fields/DateInputField';
import Button from '../Button';
import { phoneMask } from './utils/masks';

export default {
  title: 'Form'
};

export const TestForm = () => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  return (
    <Box align="center">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          gender: '',
          email: '',
          number: 0,
          password: '',
          search: '',
          tel: '',
          date: '',
          acceptedTerms: false
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().max(15, 'Must be 15 characters or less'),
          lastName: Yup.string().max(20, 'Must be 20 characters or less'),
          email: Yup.string().email('Invalid email address'),
          gender: Yup.string().oneOf(['male', 'female'], 'Invalid Gender Type'),
          acceptedTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions.'),
          tel: Yup.string().required(),
          date: Yup.string().required()
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <Box direction="row" gap="large">
            <Box>
              <InputField name="firstName" label="First Name" />

              <InputField name="lastName" label="Last Name" />

              <SelectField
                name="gender"
                options={genderOptions}
                label="Gender"
                placeholder={'Your Gender'}
                isClearable={true}
                isSearchable={false}
              />

              <InputField name="email" type="email" label="Email Address" />

              <InputField name="number" type="number" label="Number" />
            </Box>

            <Box>
              <InputField name="password" type="password" label="Password" />

              <InputField name="search" type="search" label="Search" />

              <InputField name="tel" type="tel" label="Phone" mask={phoneMask} />

              <DateInputField name="date" label="Date" />

              <CheckboxField name="acceptedTerms" label="Accept the terms and conditions" />
            </Box>
          </Box>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </Box>
  );
};
