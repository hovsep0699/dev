import React from "react";
import {FormPresenterViewModel} from "./FormPresenterViewModel";
import {Principal} from "../../../../domain/model/Principal";
import {Representative} from "../../../../domain/model/Representative";
import autobind from "autobind-decorator";
import {SubAdmin} from "../../../../domain/model/SubAdmin";
import {PrincipalAdmin} from "../../../../domain/model/PrincipalAdmin";
import {compareArrays} from "../../../../utils/json_hepler";
import {state} from "../../../presenter/BasicState";


export class FormPresenterState implements state<FormPresenterState, FormPresenterViewModel> {
    public principals: Principal[];
    public representatives: Representative[];
    public admins: SubAdmin[];
    public currentAdmin: PrincipalAdmin;
    public isActive: boolean;
    public isParentActive: boolean;
    public isSubmitting: boolean;
    public status: string | React.ReactNode | null;
    public isEditMode: boolean;
    public handleSubmit: ((e: any)=>void) | null;

    constructor({
                    principals,
                    representatives,
                    currentAdmin,
                    isParentActive,
                    admins,
                    isActive,
                    isSubmitting,
                    status,
                    isEditMode,
                    handleSubmit,
                }: FormPresenterViewModel) {
        // this.toFlatJson.bind(this);
        // this.copyWith.bind(this);
        this.principals = principals ?? new Array<Principal>();
        this.representatives = representatives ?? new Array<Representative>();
        this.isActive = isActive ?? false;
        this.isParentActive = isParentActive ?? true;
        this.currentAdmin = currentAdmin ?? new PrincipalAdmin();
        this.admins = admins ?? new Array<SubAdmin>();
        this.status = status ?? null;
        this.isEditMode = isSubmitting ?? false;
        this.isSubmitting = isEditMode ?? false;
        this.handleSubmit = handleSubmit ?? null;
    }

    @autobind
    public initial(): FormPresenterState {
        return new FormPresenterState(
            {
                principals: [],
                representatives: [],
                admins: [],
                currentAdmin: new PrincipalAdmin(),
                status: null,
                isEditMode: false,
                isSubmitting: false,
                isActive:  false,
                isParentActive: true,
                handleSubmit: null,
            }
        )
    }

    @autobind
    public copyWith({
                 principals,
                 representatives,
                 currentAdmin,
                 admins,
                 isParentActive,
                 isActive,
                 isSubmitting,
                 status,
                 isEditMode,
                 handleSubmit,
             }: FormPresenterViewModel ): FormPresenterState {
        return new FormPresenterState({
            principals: principals ?? this.principals,
            representatives: representatives ?? this.representatives,
            currentAdmin: currentAdmin ?? this.currentAdmin,
            admins: admins ?? this.admins,
            isParentActive: isParentActive ?? this.isParentActive,
            isActive: isActive ?? this.isActive,
            isSubmitting: isSubmitting ?? this.isSubmitting,
            status: status ?? this.status,
            handleSubmit: handleSubmit ?? this.handleSubmit,
            isEditMode: isEditMode ?? this.isEditMode,
        }) as FormPresenterState;
    }

    @autobind
    public compare(other: FormPresenterState): boolean {
        return compareArrays<Principal>(this.principals, other.principals) &&
            compareArrays<Representative>(this.representatives, other.representatives) &&
            compareArrays<SubAdmin>(this.admins, other.admins) &&
            this.currentAdmin.compare(other.currentAdmin) &&
            this.isSubmitting === other.isSubmitting &&
            this.status === other.status &&
            this.isEditMode === other.isEditMode &&
            this.handleSubmit === other.handleSubmit &&
            this.isActive === other.isActive &&
            this.isParentActive === other.isParentActive;
    }


    @autobind
    public toFlatJson(){
        return {
            force: true,
            principals: this.principals,
            representatives: this.representatives,
            // isSubmitting: this.isSubmitting,
            status: this.status,
            // isEditMode: this.isEditMode,
            // handleSubmit: this.handleSubmit,
        }
    }
}