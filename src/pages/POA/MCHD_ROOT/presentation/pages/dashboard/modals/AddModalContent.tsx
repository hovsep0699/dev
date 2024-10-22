import React from 'react'
import Button, { ButtonKinds } from '@distate/app/src/pages/POA/MCHD_ROOT/common/Button'
import { Box } from 'grommet'
import { InputField } from '@distate/app/src/pages/POA/MCHD_ROOT/common/Form'
import { Form, Formik } from 'formik'
import {IDialogContentProps} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/IDialogContentProps";

const AddModalContent: React.FC<IDialogContentProps> = ({hideDialog}: IDialogContentProps) => {
  
 /* 
 type InputFieldProps = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel';
  placeholder?: string;
  hideErrors?: boolean;
  mask?: IMask[];
};
 */
  return (
        <Box direction={"column"} justify={"center"} margin={{top: "medium"}} gap="20px">
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
                
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                }}
            >
                <Form>
                    <Box  direction="column" gap="30px" align='center' justify='center' margin="10px 0">
                        <Box width="400px" height="40px" justify='center'>
                            <InputField placeholder={"Введите уникальный номер доверенности"}  name="Уникальный номер доверенности" label="Уникальный номер доверенности" />
                        </Box>
                        <Box width="400px" height="40px" justify='center'>
                            <InputField placeholder={"Введите ИНН Доверителя"}  type='text' name="ИНН Доверителя" label="ИНН Доверителя" />
                        </Box>
                        <Box width="400px" height="40px" justify='center'>
                            <InputField placeholder={"Введите ИНН Представитля"} name="ИНН Представитля" type="text" label="ИНН Представитля" />
                        </Box>

                    <Box direction="row" width={"100%"} justify="center" gap="20px">
                        <Box direction={"column"} width={"100%"} justify={"center"}>
                            <Button type='submit' fullWidth={true} kind={ButtonKinds.Primary}>
                                    <span style={{fontWeight: "bold", fontSize: "16px"}}>
                                        Подтвердить
                                    </span>
                            </Button>
                        </Box>
                        <Box direction={"column"} width={"100%"} justify={"center"}>
                            <Button fullWidth={true} onClick={()=> hideDialog ? hideDialog() : null}>
                                <span style={{fontWeight: "bold", fontSize: "16px"}}>
                                    Отмена
                                </span>
                            </Button>
                        </Box>
                    </Box>
                    </Box>
                </Form>
            </Formik>
        </Box>
  )
}

export default AddModalContent