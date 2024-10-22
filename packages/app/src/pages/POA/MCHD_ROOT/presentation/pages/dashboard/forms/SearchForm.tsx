import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box } from 'grommet';
import { SelectField } from '../../../../common/Form';
import DateInputField from '../../../../common/Form/fields/DateInputField';
import Button, { ButtonKinds } from '../../../../common/Button';
import {IDialogContentProps} from "../modals/IDialogContentProps";
import {IconClose, IconSearch} from "../../../../assets/icons";
import {POAType} from "../../../constants/SelectionConstants";


export default {
  title: 'Form'
};





export const SearchForm: React.FC<IDialogContentProps> = ({hideDialog}: IDialogContentProps) => {


  const [type, setType] = React.useState(POAType[0]);

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
          <Box direction="row" gap="20px">
            <Box>
             
              <SelectField
                name="Доверитель"
                options={POAType}
                onChange={(e)=>setType(e.value)}
                label="Доверитель"
                // placeholder={'Your Gender'}
                isClearable={true}
                isSearchable={false}
              />
              <SelectField
                name="Представитель "
                options={POAType}
                onChange={(e)=>setType(e.value)}
                label="Представитель"
                // placeholder={'Представитель'}
                isClearable={true}
                isSearchable={false}
              />
              <SelectField
                name="Идентификатор "
                options={POAType}
                onChange={(e)=>setType(e.value)}
                label="Идентификатор"
                // placeholder={'Your Gender'}
                isClearable={true}
                isSearchable={false}
              />
              <SelectField
                name="Статус "
                options={POAType}
                onChange={(e)=>setType(e.value)}
                label="Статус"
                // placeholder={'Your Gender'}
                isClearable={true}
                isSearchable={false}
              />
              <SelectField
                name="ИНН Доверителя "
                options={POAType}
                onChange={(e)=>setType(e.value)}
                label="ИНН Доверителя"
                // placeholder={'Your Gender'}
                isClearable={true}
                isSearchable={false}
              />
              <SelectField
                name="ИНН Представителя "
                options={POAType}
                onChange={(e)=>setType(e.value)}
                label="ИНН Представителя"
                // placeholder={'Your Gender'}
                isClearable={true}
                isSearchable={false}
              />
              <Box direction="row" gap="10px">

              <DateInputField  name="date" label="Дата действия с" />
              <DateInputField name="date" label="по" />
              </Box>
                <Box width={"50%"}>
                    <DateInputField  name="date" label="Дата выдачи" />
                </Box>
            </Box>

            
          </Box>
          <Box direction="column" gap="10px">

          <Button onClick={()=> hideDialog ? hideDialog() : null} icon={<IconClose />} kind={ButtonKinds.Default}>Очистить</Button>
          <Button kind={ButtonKinds.Secondary} icon={<IconSearch fill={"white"} />} type="submit">Фильтровать</Button>
          </Box>


        </Form>
      </Formik>
    </Box>
  );
};
