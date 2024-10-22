import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box } from 'grommet';
import {useGlobalState} from "../../../mocks/context/GlobalState";
import {AdminInulFields, inUlAdminOptions} from "../../constants/initialValues/AdminFormInitialData";
import SelectField from "../../../common/Form/fields/SelectField";
import InputField from "../../../common/Form/fields/InputField";
import {DatePicker} from "../../../common/DatePicker";
import Button, {ButtonKinds} from "../../../common/Button";

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

const VariadicFormForInterULAdmin = ({ handleSubmit, close }: any) => {
  
  const [formType, setFormType] = useState('ИнЮЛ');
  //console.log(ulAdminOptions[0].value);
  
  const { records, setRecords } = useGlobalState();
  const [date,setDate] = useState(new Date());

  const [fields, setFields] = useState(AdminInulFields);

  //console.log(fields.map((fields)=>fields.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" })), { type: formType }));

  const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    ...buildValidationSchema(fields),
  });

  const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // dd.mm.yyyy
  };
  const init = fields.reduce((acc: any, section: any) => {
    return acc.concat(section.fields);
  }, []);
  
  return (
    <Box justify='center' align='center' direction='column' gap='20px'>
      <Formik
        initialValues={init.reduce((acc: any, field: any) => ({ ...acc, [field.name]: "" }), { type: formType })}
        validationSchema={validationSchema}
        
        onSubmit={async (values, { setSubmitting ,setStatus}) => {
          //console.log(values);
          try {
            // Your form submission logic here
            //console.log("ping");
            
            await handleSubmit(values);

            // If submission is successful, reset the status
            setStatus(null);
          } catch (error) {
            //console.log("ping");
            
            // Handle submission error
            console.error(error);
            
            setStatus('Something went wrong. Please try again.');
          } finally {
            setSubmitting(false);
          }
        
        }}
      >
        {({ setFieldValue, isSubmitting,status }) => (
          <Form style={{ width: '100%', boxSizing: 'border-box', backgroundColor: 'white' }}>
            <Box pad={{ vertical: 'small' }} justify='center' width={"100%"}>
              <h1 style={{textAlign:"center"}}>Добавить запись {formType}</h1></Box>
            <SelectField
              name="type"
              options={inUlAdminOptions}
              label="Тип"
              onChange={(option: any) => {
                
                setFormType(option.value);
                setFieldValue('type', option.value);
              }}
            />
          
            {fields.map((field: any,index: number) => {
              // //console.log("field");
              // //console.log(field.fields,index);
              
             return (
                <>
                {
                index != 0 && (
                        <Box width={"100%"} key={index} pad={{ vertical: 'medium'}} ><h2 style={{textAlign:"center"}}>{field.section}</h2></Box>
                    )
                }
                
                 { field.fields.map((elem: any)=>{
                    switch (elem.type) {
                      case 'input':
                        return <InputField  key={elem.name} name={elem.name} label={elem.label} />;
                      case 'select':
                        return <SelectField key={elem.name} name={elem.name} label={elem.label} options={elem.options} />;
                      case 'date':
                        return  <DatePicker
                        required
                        name="from"
                        label="Дата"
                        value={new Date()}
                        placeholderText="Формат: ДД.ММ.ГГГГ"
                        onChange={(e) => {
                          const data = formatDate(e);
                          //console.log(data);
                        setFieldValue(elem.name, data);}}
                      />;
                      default:
                        return null;
                    }
                })}
                </>
            );
              
            })}
            <Button
              kind={ButtonKinds.Orange}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
            <Button
              
             onClick={()=>close(false)}
            >
              close
            </Button>
         
              <Box pad={{ vertical: 'small' }}>
                <span style={{ color: 'red', fontSize: '140px' }}>{status}</span>
              </Box>
          
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default VariadicFormForInterULAdmin;

