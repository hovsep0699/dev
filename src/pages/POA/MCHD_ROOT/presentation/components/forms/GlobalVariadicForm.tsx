import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box } from 'grommet';
import AdminSectionForm from '@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/sections/AdminSectionForm';
import "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/globalVariadicForm.css"
import SelectField from "@distate/app/src/pages/POA/MCHD_ROOT/common/Form/fields/SelectField";
import InputField from "@distate/app/src/pages/POA/MCHD_ROOT/common/Form/fields/InputField";
import {DatePickerNew} from "@distate/app/src/pages/POA/MCHD_ROOT/common/date-picker-new";
import InputMaskField from "@distate/app/src/pages/POA/MCHD_ROOT/common/Form/InputMaskField/InputMaskField";
import {format, parse} from "date-fns";
import {AddressValidationScheme} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/ValidationScheme/AddressValidationScheme";
import {AddressType, addressTypes} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/SelectionConstants";
import {PersonalDocumentValidationScheme} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/ValidationScheme/PersonalDocumentValidationScheme";




// Function to build validation schema based on fields
const buildValidationSchema = (fields: any) => {
  console.log(fields);

  return fields.reduce((schema: any, field: any) => {
          if (field.validation) {
              schema[field.name] = field.validation;
          } else if (field.required) {
              schema[field.name] = Yup.string().required('Required');
          }
      return {
            ...schema,
            ...AddressValidationScheme,
            ...PersonalDocumentValidationScheme
          };
  }, {});
};

const getAddressType = (value?: string | null) => {
    if (!value || value.length === 0) {
        return AddressType.normal;
    }
    // if ()
    if (value === AddressType.normal.toString()) {
        return AddressType.normal;
    }
    return  AddressType.fias;
}

interface GlobalVariadicFormChildProps {
    setFieldValue: any,
    errors: any,
    formType: any,
    adminIndex: any,
    handleRemoveSubAdmin: any,
    handleSubmitSubAdmin: any,
    handleEditSubAdmin: any,
    setFormType: any,
    admins: any,
    fields: any,
    defaultValues: any,
    formTypes: any,
}

const GlobalVariadicFormChild = ({
  setFieldValue,
  errors,
  formType,
  adminIndex,
  handleRemoveSubAdmin,
  handleSubmitSubAdmin,
  handleEditSubAdmin,
  setFormType,
  admins,
  fields,
  defaultValues,
  formTypes,
}: GlobalVariadicFormChildProps) => {
  const [addressType, setAddressType] = useState<AddressType>(getAddressType(defaultValues["addressType"]));

  return (
      <Form className={"themed_form"} style={{ width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxSizing: 'border-box', backgroundColor: 'white', zIndex: 1000}}>
          <Box direction={"column"} width={"100%"} justify={"center"}>
              <Box pad={{ vertical: 'small' }} justify="center" width={"100%"}>
                  <h1 style={{ textAlign: "center" }}>Добавить запись {formType}</h1>
              </Box>
              <Box direction={"row"} width={"100%"} justify={"center"}>
                  <Box direction={"column"} width={"340px"} justify={"center"}>
                      <SelectField
                          name="type"
                          options={formTypes}
                          label="Тип"
                          onChange={(option) => {
                                  setFormType(option.value);
                                  setFieldValue('type', option.value);
                          }}
                      />
                  </Box>
              </Box>
              {fields.map((field: any, index: number) => (
                  <React.Fragment key={index}>
                          <hr style={{margin: "16px 0"}}/>
                      <Box direction={"row"} width={"100%"} justify={"center"}>
                          <Box direction={"column"} width={"340px"} justify={"center"}>

                      {index !== 0 && (
                          <Box width={"100%"} pad={{ vertical: '10px' }}>
                              <h3 style={{ textAlign: "center", background: "#fcfcfc", fontWeight: 300, fontSize: "20px", fontFamily: "Roboto, Arial, Helvetica Neue"}}>{field.section}</h3>
                          </Box>
                      )}

                      {/* Address Field Handling */}
                      {field.id === 'address' &&
                      <>
                          <SelectField
                              // has
                              name="addressType"
                              options={addressTypes}
                              label="Тип адреса"
                              onChange={(option) => {
                                  setAddressType(option.value === AddressType.normal.toString() ? AddressType.normal : AddressType.fias);
                                  setFieldValue('addressType', option.value);
                              }}/>
                         { field.fields.map((elem: any) => {
                              if (addressType === AddressType.normal && ['regionCode', 'Index', 'Province', 'city', 'settlement', 'street', 'house', 'block', 'flat'].includes(elem.name)) {
                                  return (
                                      <InputField
                                          key={elem.name}
                                          title={elem.title}
                                          name={elem.name}
                                          label={elem.label}
                                          placeholder={elem.placeholder}
                                      />
                                  );
                              }
                              if (addressType === AddressType.fias && ['regionCode', 'fiasId', 'fiasText'].includes(elem.name)) {
                                  if (elem.name === "fiasId")
                                      return <InputMaskField
                                          key={elem.name}
                                          title={elem.title}
                                          name={elem.name}
                                          label={elem.label}
                                          value={elem.value}
                                          mask={"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
                                          maskReg={/[-\s]/}
                                          placeholder={elem.placeholder}
                                      />;
                                  return (
                                      <InputField
                                          value={elem.value}
                                          key={elem.name}
                                          title={elem.title}
                                          name={elem.name}
                                          label={elem.label}
                                          placeholder={elem.placeholder}
                                      />
                                  );
                              }
                              return null;
                          })}
                          </>
                      }

                      {/* Non-Address Fields */}
                      {field.id !== 'address' &&
                          field.fields.map((elem: any) => {
                              switch (elem.type) {
                                  case 'input':
                                      if (elem.name === "socialNumber")
                                          return <InputMaskField
                                              value={elem.value}
                                              key={elem.name}
                                              title={elem.title}
                                              name={elem.name}
                                              label={elem.label}
                                              mask={"xxx-xxx-xxx xx"}
                                              maskReg={/[-\s]/}
                                              placeholder={elem.placeholder}
                                          />;
                                      return (
                                          <InputField
                                              value={elem.value}
                                              key={elem.name}
                                              title={elem.title}
                                              name={elem.name}
                                              label={elem.label}
                                              placeholder={elem.placeholder}
                                          />
                                      );
                                  case 'select':
                                      return (
                                          <SelectField
                                              key={elem.name}
                                              name={elem.name}
                                              label={elem.label}
                                              options={elem.options}
                                          />
                                      );
                                  case 'date':
                                      return (
                                          <DatePickerNew
                                              error={errors[elem.name]}
                                              key={elem.name}
                                              required={elem.required}
                                              name={elem.name}
                                              label={elem.label}
                                              value={defaultValues[elem.name] ? parse(defaultValues[elem.name], "dd.MM.yyyy", new Date()) : field.value}
                                              onChange={(e) => {
                                                  const formattedDate = format(e, 'dd.MM.yyyy');
                                                  setFieldValue(elem.name, formattedDate);
                                              }}
                                              title="Введите дату в формате dd.mm.yyyy"
                                              placeholder="Формат: ДД.ММ.ГГГГ"
                                          />
                                      );
                                  case 'button':
                                      return <AdminSectionForm
                                          adminIndex={adminIndex}
                                          admins={admins}
                                          handleRemoveSubAdmin={handleRemoveSubAdmin}
                                          handleSubmitSubAdmin={handleSubmitSubAdmin}
                                          handleEditSubAdmin={handleEditSubAdmin}
                                          setFieldValue={setFieldValue} />;
                                  default:
                                      return null;
                              }
                          })
                      }
                      </Box>
                      </Box>
                  </React.Fragment>
              ))}
          </Box>
      </Form>
  );
}

interface GlobalVariadicFormProps {
    handleSubmit: any;
    isSubmitting: boolean;
    handleSubmitSubAdmin?: any;
    handleRemoveSubAdmin?: any;
    handleEditSubAdmin?: any;
    adminIndex?: any,
    close?: any;
    formID?: any;
    admins?: any
    onStateChange?: (status?: string, isSubmitting?: boolean, handleSubmit?: any) => void;
    formTypes: any,
    isValidating?: boolean | null;
    closeOnSubmit?: any;
    initialFields: any,
    defaultValues: any
}


const GlobalVariadicForm: React.FC<GlobalVariadicFormProps> = ({ handleSubmit, isSubmitting, formID, isValidating, handleRemoveSubAdmin, closeOnSubmit, handleSubmitSubAdmin, handleEditSubAdmin ,admins, adminIndex, close, formTypes, onStateChange, initialFields, defaultValues = {} }: GlobalVariadicFormProps) => {
  const [formType, setFormType] = useState(defaultValues["type"]);
  const [fields, setFields] = useState([]);

    console.log("KJKKKKKKK:::: ", isValidating);
  // Handle schema state
  const [schema, setSchema] = useState(Yup.object({}));

  useEffect(() => {
    // Update fields when formType changes
      if (formType) {
          const selectedFields = initialFields[formType!] || [];
          setFields(selectedFields);
      }
  }, [formType, initialFields]);

  useEffect(() => {
    const updatedSchema = Yup.object({
      type: Yup.string().required('Required'),
      addressType: Yup.string().required('Required'),
      ...buildValidationSchema(fields.reduce((acc: any, section: any) => acc.concat(section.fields), [])),
    });
    setSchema(updatedSchema);
    console.log(updatedSchema);
    
  }, [fields]);

  const initialValues = fields.reduce(
    (acc: any, section: any) => ({
      ...acc,
      ...section.fields.reduce(
        (acc: any, field: any) => ({
          ...acc,
          [field.name]: defaultValues[field.name] ?? '',  // Use default value if provided
        }),
        {}
      ),
    }),
    { type: formType, addressType: AddressType.normal.toString()},
  );

  return (
    <Box justify="center" align="center" direction="column" width={"100%"} gap="20px" >
      <Formik
          key={formID}
          // isValidating={isValidating}
        initialValues={initialValues}
        validationSchema={(isValidating ?? true) ? schema : Yup.object({})}
        enableReinitialize={true}
        onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
          try {
            await handleSubmit(values);
            setStatus(null);
            setSubmitting(isSubmitting);
            if (!isSubmitting) {
                if (closeOnSubmit) {
                    closeOnSubmit!();
                } else if (close) {
                    close();
                }
                resetForm();
            }
          } catch (error) {
            setStatus('Something went wrong. Please try again.');
            setSubmitting(false);

          }
        }}
      >
          {({setFieldValue, isSubmitting, handleSubmit, status, values, errors})=> {
              if (onStateChange != null) {
                  onStateChange!(status, isSubmitting, handleSubmit);
              }
              console.log("ERROOORRRSS:::: ", errors)
              return (<GlobalVariadicFormChild
                  setFieldValue={setFieldValue}
                  errors={errors}
                  admins={admins}
                  formTypes={formTypes}
                  formType={formType}
                  fields={fields}
                  defaultValues={defaultValues}
                  handleRemoveSubAdmin={handleRemoveSubAdmin}
                  handleSubmitSubAdmin={handleSubmitSubAdmin}
                  handleEditSubAdmin={handleEditSubAdmin}
                  adminIndex={adminIndex}
                  // formatDate={formatDate}
                  setFormType={setFormType}
              />
          );}}

      </Formik>
    </Box>
  );
};



export default GlobalVariadicForm;
