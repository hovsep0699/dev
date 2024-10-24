import React from "react";
import {DashboardPresenterViewModel} from "./DashboardPresenterViewModel";
import {Principal} from "../../../../domain/model/Principal";
import {Representative} from "../../../../domain/model/Representative";
import autobind from "autobind-decorator";
import {state} from "../../../presenter/BasicState"
import {compareArrays} from "../../../../utils/json_hepler";

export class DashboardPresenterState implements state<DashboardPresenterState, DashboardPresenterViewModel>{
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
                    handleSubmit,
                }: DashboardPresenterViewModel) {
        // this.toFlatJson.bind(this);
        // this.copyWith.bind(this);
        this.principals = principals ?? [];
        this.representatives = representatives ?? [];
        this.status = status ?? null;
        this.isEditMode = isSubmitting ?? false;
        this.isSubmitting = isEditMode ?? false;
        this.handleSubmit = handleSubmit ?? null;
    }

    @autobind
    public copyWith({
                 principals,
                 representatives,
                 isSubmitting,
                 status,
                 isEditMode,
                 handleSubmit,
             }: DashboardPresenterViewModel ): DashboardPresenterState {
        return new DashboardPresenterState({
            principals: principals ?? this.principals,
            representatives: representatives ?? this.representatives,
            isSubmitting: isSubmitting ?? this.isSubmitting,
            status: status ?? this.status,
            handleSubmit: handleSubmit ?? this.handleSubmit,
            isEditMode: isEditMode ?? this.isEditMode,
        });
    }
    @autobind
    public initial(): DashboardPresenterState {
        return new DashboardPresenterState(
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
    public compare(other: DashboardPresenterState): boolean {
        return compareArrays<Principal>(this.principals, other.principals) &&
            compareArrays<Representative>(this.representatives, other.representatives) &&
            this.isSubmitting === other.isSubmitting &&
            this.status === other.status &&
            this.isEditMode === other.isEditMode &&
            this.handleSubmit === other.handleSubmit;
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