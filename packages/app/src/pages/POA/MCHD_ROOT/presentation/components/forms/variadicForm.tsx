import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box } from 'grommet';
import {useGlobalState} from "../../../mocks/context/GlobalState";
import SelectField from "../../../common/Form/fields/SelectField";
import InputField from "../../../common/Form/fields/InputField";
import {DatePicker} from "../../../common/DatePicker";
import Button, {ButtonKinds} from "../../../common/Button";

// Function to build validation schema based on fields
const buildValidationSchema = (fields: any) => {
  return fields.reduce((schema: any, field: any) => {
    if (field.validation) {
      schema[field.name] = field.validation;
    } else if (field.required) {
      schema[field.name] = Yup.string().required('Required');
    }
    return schema;
  }, {});
};

const VariadicForm = ({ handleSubmit, close, formTypes, initialFields, defaultValues = {} }: any) => {
  console.log("initialFields");
  //console.log(initialFields);
  
  
  function foo(params:any,values:any) {
    console.log("foo");
    console.log(params);
    console.log(values);
    
    console.log(Object.keys(params).length === 0);
    if(Object.keys(params).length === 0){
      console.log("no errors");
      handleSubmit(values);
      close();
    }
    
  
  }
  const [formType, setFormType] = useState(formTypes[0]?.value);
  // const { records, setRecords } = useGlobalState();
  const [fields, setFields] = useState(initialFields[formType] || []);
  console.log(fields[0]);

  useEffect(() => {
    const selectedFields = initialFields[formType] || [];
    setFields(selectedFields);
    //console.log("changeeessss");
    //console.log(formType);
    //console.log("changeeessss");
    
  }, [formType]);

  
  
  const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    ...buildValidationSchema(fields.reduce((acc: any, section: any) => acc.concat(section.fields), [])),
  });

  const initialValues = fields.reduce(
    (acc: any, section: any) => ({
      ...acc,
      ...section.fields.reduce(
        (acc: any, field: any) => ({
          ...acc,
          [field.name]: defaultValues[field.name] || '',  // Use default value if provided
        }),
        {}
      ),
    }),
    { type: formType }
  );

  const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <Box justify="center" align="center" direction="column" width={"100%"} gap="20px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await handleSubmit(values);
            setStatus(null);
          } catch (error) {
            console.error(error);
            setStatus('Something went wrong. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting, status,errors,values }) => (
          <Form style={{ width: '320px', boxSizing: 'border-box', backgroundColor: 'white', zIndex: 1000 }}>
            <Box pad={{ vertical: 'small' }} justify="center" width={"100%"}>
              <h1 style={{ textAlign: "center" }}>Добавить запись {formType}</h1>
            </Box>
            <SelectField
              name="type"
              options={formTypes}
              label="Тип"
              onChange={(option: any) => {
                setFormType(option.value);
                setFieldValue('type', option.value);
              }}
            />
            {fields.map((field: any, index: number) => (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <Box width={"100%"} pad={{ vertical: 'medium' }}><h2 style={{ textAlign: "center" }}>{field.section}</h2></Box>
                )}
                {field.fields.map((elem: any) => {
                  switch (elem.type) {
                    case 'input':
                      return (<InputField title='heellllo' key={elem.name} name={elem.name} label={elem.label} placeholder={'Введите ' + elem.label} />);
                    case 'select':
                      return <SelectField key={elem.name} name={elem.name} label={elem.label} options={elem.options} />;
                    case 'date':
                      return (
                        <DatePicker
                          key={elem.name}
                          required={elem.required}
                          name={elem.name}
                          label={elem.label}
                          value={defaultValues[elem.name] ? new Date(defaultValues[elem.name]) : new Date()}
                          placeholderText="Формат: ДД.ММ.ГГГГ"
                          onChange={(e) => {
                            const formattedDate = formatDate(e);
                            setFieldValue(elem.name, formattedDate);
                          }}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </React.Fragment>
            ))}
            <Button kind={ButtonKinds.Orange} type="button" onClick={()=>foo(errors,values)} disabled={isSubmitting}>
              Submit
            </Button>
            <Button onClick={() => close(false)}>
              Close
            </Button>
            {status && (
              <Box pad={{ vertical: 'small' }}>
                <span style={{ color: 'red', fontSize: '14px' }}>{status}</span>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default VariadicForm;
