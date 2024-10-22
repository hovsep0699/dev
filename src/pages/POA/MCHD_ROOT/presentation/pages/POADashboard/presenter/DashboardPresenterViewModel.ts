import React from "react";
import {Representative} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Representative";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";

export interface DashboardPresenterViewModel {
    principals?: Principal[];
    representatives?: Representative[];
    isSubmitting?: boolean;
    status?: string | React.ReactNode | null;
    isEditMode?: boolean;
    handleSubmit?: ((e: any)=>void) | null;
}