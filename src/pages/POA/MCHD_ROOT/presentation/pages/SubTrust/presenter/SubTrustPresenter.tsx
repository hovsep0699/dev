import React from "react";
import {Presenter} from "../../../presenter/presenter";
import {SelectionType} from "../../../../domain/model/SelectionType";
import {Tax} from "../../../../domain/model/Tax";
import {SubTrustPresenterState} from "./SubTrustPresenterState";
import {PrincipalManager} from "../../../../core/PrincipalManager";
import {RepresentativeManager} from "../../../../core/RepresentativeManager";
import {Representative} from "../../../../domain/model/Representative";
import {Principal} from "../../../../domain/model/Principal";
import autobind from "autobind-decorator";
import {SubTrustPresenterViewModel} from "./SubTrustPresenterViewModel";

export class SubTrustPresenter extends Presenter<SubTrustPresenterViewModel, SubTrustPresenterState> {
    private principalManager: PrincipalManager;
    private representativeManager: RepresentativeManager;

    constructor(principalManager: PrincipalManager, representativeManager: RepresentativeManager) {
        super(new SubTrustPresenterState({
            principals: principalManager.getPrincipals(),
            representatives: representativeManager.getRepresentatives()
        }));
        this.principalManager = principalManager;
        this.representativeManager = representativeManager;

    }

    @autobind
    public onStatusChange(status?: string | React.ReactNode | null): void {
        this.setState(this.state.copyWith({status: status}));
    }

    @autobind
    public onHandleSubmitChange(handleSubmit?: ((e: any)=>void) | null): void {
        this.setState(this.state.copyWith({handleSubmit: handleSubmit}));
    }

    @autobind
    public onSubmittingChange(isSubmitting?: boolean): void {
        this.setState(this.state.copyWith({isSubmitting: isSubmitting}));
    }


    @autobind
    public onEditModeChange(isEditMode?: boolean): void {
        this.setState(this.state.copyWith({isEditMode: isEditMode}));
    }


    @autobind
    public onPrincipalsChange(principals: Principal[]): void {
        this.setState(this.state.copyWith({principals: principals}));
    }

    @autobind
    public onRepresentativesChange(representatives: Representative[]): void {
        this.setState(this.state.copyWith({representatives: representatives}));
    }


    @autobind
    public onFormStateChange(status?: string | React.ReactNode | null, isSubmitting?: boolean, handleSubmit?: ((e: any)=>void) | null): void {
        this.onStatusChange(status);
        this.onSubmittingChange(isSubmitting);
        this.onHandleSubmitChange(handleSubmit);
    }

    @autobind
    public update(){
        this.setState(this.state.copyWith({
            principals: this.principalManager.getPrincipals(),
            representatives: this.representativeManager.getRepresentatives()
        }));
    }
}

