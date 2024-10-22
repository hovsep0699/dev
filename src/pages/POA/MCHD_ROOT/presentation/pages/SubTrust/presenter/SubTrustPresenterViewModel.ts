import React from "react";
import {Principal} from "../../../../domain/model/Principal";
import {Representative} from "../../../../domain/model/Representative";

export interface SubTrustPresenterViewModel {
    principals?: Principal[] | null;
    representatives?: Representative[] | null;
    isSubmitting?: boolean | null;
    status?: string | React.ReactNode | null;
    isEditMode?: boolean | null;
    handleSubmit?: ((e: any)=>void) | null;
}