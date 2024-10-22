import React from "react";
import {SubTrustPresenterViewModel} from "./SubTrustPresenterViewModel";
import {Principal} from "../../../../domain/model/Principal";
import {Representative} from "../../../../domain/model/Representative";
import autobind from "autobind-decorator";
import {compareArrays} from "../../../../utils/json_hepler";
import {state} from "../../../presenter/BasicState";

export class SubTrustPresenterState implements state<SubTrustPresenterState, SubTrustPresenterViewModel> {
    public principals: Principal[];
    public representatives: Representative[];
    public isSubmitting: boolean;
    public status: string | React.ReactNode | null;
    public isEditMode: boolean;
    public handleSubmit: ((e: any)=>void) | null;

    constructor({
                    principals,
                    representatives,
                    isSubmitting,
                    status,
                    isEditMode,
                    handleSubmit
                }: SubTrustPresenterViewModel) {
        this.principals = principals ?? [];
        this.representatives = representatives ?? [];
        this.status = status ?? null;
        this.isEditMode = isSubmitting ?? false;
        this.isSubmitting = isEditMode ?? false;
        this.handleSubmit = handleSubmit ?? null;
    }

    @autobind
    initial(): SubTrustPresenterState {
        return new SubTrustPresenterState(
            {
                principals: [],
                representatives: [],
                status: null,
                isEditMode: false,
                isSubmitting: false,
                handleSubmit: null,
            }
        )
    }
    @autobind
    copyWith({
                 principals,
                 representatives,
                 isSubmitting,
                 status,
                 isEditMode,
                 handleSubmit,
             }: SubTrustPresenterViewModel ): SubTrustPresenterState {
        return new SubTrustPresenterState({
            principals: principals ?? this.principals,
            representatives: representatives ?? this.representatives,
            isSubmitting: isSubmitting ?? this.isSubmitting,
            status: status ?? this.status,
            handleSubmit: handleSubmit ?? this.handleSubmit,
            isEditMode: isEditMode ?? this.isEditMode,
        }) as SubTrustPresenterState;
    }

    @autobind
    compare(other: SubTrustPresenterState): boolean {
        return compareArrays<Principal>(this.principals, other.principals) &&
            compareArrays<Representative>(this.representatives, other.representatives) &&
            this.isSubmitting === other.isSubmitting &&
            this.isEditMode === other.isEditMode &&
            this.handleSubmit === other.handleSubmit;
    }
    @autobind
    toFlatJson(){
        return {
            force: true,
            principals: this.principals,
            representatives: this.representatives,
            status: this.status,
        }
    }
}