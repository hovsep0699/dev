import React from "react";
import {Representative} from "../../../../domain/model/Representative";
import {Principal} from "../../../../domain/model/Principal";

export interface CreatePresenterViewModel {
    principals?: Principal[];
    representatives?: Representative[];
    isSubmitting?: boolean;
    status?: string | React.ReactNode | null;
    isEditMode?: boolean;
    handleSubmit?: ((e: any)=>void) | null;
}