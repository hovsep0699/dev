import React from "react";
import {Representative} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Representative";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import {SubAdmin} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/SubAdmin";
import {PrincipalAdmin} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/PrincipalAdmin";

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