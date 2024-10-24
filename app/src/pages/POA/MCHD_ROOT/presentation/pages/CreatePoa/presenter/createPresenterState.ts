import React from "react";
import {CreatePresenterViewModel} from "./createPresenterViewModel";
import {Principal} from "../../../../domain/model/Principal";
import {Representative} from "../../../../domain/model/Representative";
import autobind from "autobind-decorator";
import {compareArrays} from "../../../../utils/json_hepler";
import {state} from "../../../presenter/BasicState";

export class CreatePresenterState implements state<CreatePresenterState, CreatePresenterViewModel>{
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
                }: CreatePresenterViewModel) {
        // this.toFlatJson.bind(this);
        // this.copyWith.bind(this);
        this.principals = principals ?? new Array<Principal>();
        this.representatives = representatives ?? new Array<Representative>();
        this.status = status ?? null;
        this.isEditMode = isSubmitting ?? false;
        this.isSubmitting = isEditMode ?? false;
        this.handleSubmit = handleSubmit ?? null;
    }

    @autobind
    public initial(): CreatePresenterState {
        return new CreatePresenterState(
            {
                principals: new Array<Principal>(),
                representatives: new Array<Representative>(),
                status: null,
                isEditMode: false,
                isSubmitting: false,
                handleSubmit: null,
            }
        )
    }

    @autobind
    public copyWith({
                 principals,
                 representatives,
                 isSubmitting,
                 status,
                 isEditMode,
                 handleSubmit,
             }: CreatePresenterViewModel ): CreatePresenterState {
        return new CreatePresenterState({
            principals: principals ?? this.principals,
            representatives: representatives ?? this.representatives,
            isSubmitting: isSubmitting ?? this.isSubmitting,
            status: status ?? this.status,
            handleSubmit: handleSubmit ?? this.handleSubmit,
            isEditMode: isEditMode ?? this.isEditMode,
        }) as CreatePresenterState;
    }

    @autobind
    public compare(other: CreatePresenterState): boolean {
        return compareArrays<Principal>(this.principals, other.principals) &&
            compareArrays<Representative>(this.representatives, other.representatives) &&
            this.isSubmitting === other.isSubmitting &&
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