import React from 'react'
import Button, { ButtonKinds } from '@distate/app/src/pages/POA/MCHD_ROOT/common/Button'
import { Box } from 'grommet'
import {IDialogContentProps} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/IDialogContentProps";

const DownloadModalContent: React.FC<IDialogContentProps> = ({hideDialog}: IDialogContentProps) => {
  
 
  return (
    // <ModalWrapper top='40%' left='50%'>
        <Box  direction="column" justify={"center"} margin={{top: "40px"}} pad={{left: "10px", right: "10px" }} width="400px" height={"100%"}>
            {/*<h2>Загрузка файла</h2>*/}
            <Box direction="row" justify="between" gap="20px">
                <Box direction={"column"} width={"medium"} justify={"start"}>
                    <Button fullWidth={true}  kind={ButtonKinds.Primary}>
                       <span style={{fontWeight: "bold", fontSize: "16px"}}>Выбрать МЧД</span>
                    </Button>
                </Box>
                <Box direction={"column"} width={"medium"} justify={"end"}>
                    <Button  fullWidth={true} onClick={()=> hideDialog ? hideDialog() : null}>
                        <span style={{fontWeight: "bold", fontSize: "16px"}}>Отмена</span>
                    </Button>
                </Box>
            </Box>
        </Box>
    // </ModalWrapper>
  )
}

export default DownloadModalContent