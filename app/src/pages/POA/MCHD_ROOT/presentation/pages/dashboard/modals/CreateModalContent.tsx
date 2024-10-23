import React from 'react'
import {SearchForm} from "../forms/SearchForm";
import {IDialogContentProps} from "./IDialogContentProps";

const CreateModalContent: React.FC<IDialogContentProps> = ({hideDialog}: IDialogContentProps) => {
    return (
        <SearchForm  hideDialog={hideDialog}/>
    )
}

export default CreateModalContent