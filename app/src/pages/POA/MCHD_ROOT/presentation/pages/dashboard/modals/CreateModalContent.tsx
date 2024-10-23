import React from 'react'
import {SearchForm} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/forms/SearchForm";
import {IDialogContentProps} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/IDialogContentProps";

const CreateModalContent: React.FC<IDialogContentProps> = ({hideDialog}: IDialogContentProps) => {
    return (
        <SearchForm  hideDialog={hideDialog}/>
    )
}

export default CreateModalContent