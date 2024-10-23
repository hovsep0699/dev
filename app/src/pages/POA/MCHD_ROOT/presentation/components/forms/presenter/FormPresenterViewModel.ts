import React from "react";
import {Representative} from "../../../../domain/model/Representative";
import {Principal} from "../../../../domain/model/Principal";
import {SubAdmin} from "../../../../domain/model/SubAdmin";
import {PrincipalAdmin} from "../../../../domain/model/PrincipalAdmin";

export interface FormPresenterViewModel {
    principals?: Principal[] | null;
    currentAdmin?: PrincipalAdmin | null;
    isActive?: boolean | null;
    isParentActive?: boolean | null;
    representatives?: Representative[] | null;
    admins?: SubAdmin[] | null;
    isSubmitting?: boolean | null;
    status?: string | React.ReactNode | null;
    isEditMode?: boolean | null;
    handleSubmit?: ((e: any)=>void) | null;
}