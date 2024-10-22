import React, {useEffect} from 'react'
import "./CancelTextArea.css"
import Button, { ButtonKinds } from '../../../../common/Button'
import { Box } from 'grommet'
import { Form, Formik } from 'formik'
import {IDialogContentProps} from "./IDialogContentProps";
import {Textarea} from "@distate/app/src/common/textarea/Textarea";

const CancelModalContent: React.FC<IDialogContentProps> = ({hideDialog}: IDialogContentProps) => {
  const [value, setValue] = React.useState<string>("");
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
    useEffect(() => {
        console.log(value)
    }, [value]);
  return (
    // <ModalWrapper top='40%' left='50%'>
        
        <Box direction={"column"}  height={"260px"} width={"100%"} pad={"10px"}>
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
                <Form style={{height: "100%", display: "flex", flexDirection: "column", justifyItems:"center",  width:"100%", gap: "90px"}}>
                <Box  direction="column" gap="20px" align='center' height={"100%"} justify='center' margin="10px 0">

                    {/*//autocomplate*/}
                    <Box direction="column" gap="20px" alignContent={"center"}  height={"100%"}>
                        <Textarea style={{height: "178px", width: "400px", resize: "none"}} required={true} onChange={(e: any)=>setValue(e.target.value)}  />
                    </Box>
                    {/*</Box>*/}

                </Box>

                    <Box direction="row" justify="center" margin={{top: "25px", bottom: "10px"}} pad={"0 10px"} gap="20px">
                        <Button type='submit' fullWidth={true}  kind={ButtonKinds.Primary}>
                            <span style={{fontWeight: "bold", fontSize: "16px"}}>Подписать</span>
                        </Button>
                        <Button fullWidth={true} onClick={() => hideDialog ? hideDialog() : null}>
                            <span style={{fontWeight: "bold", fontSize: "16px"}}>Отмена</span>
                        </Button>
                    </Box>
                </Form>
            </Formik>
            </Box>
    // </ModalWrapper>
  )
}

export default CancelModalContent