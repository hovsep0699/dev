import React from "react";
import {FormPresenterState} from "./FormPresenterState";
import {Presenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/presenter/presenter";
import {PrincipalManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/PrincipalManager";
import {RepresentativeManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/RepresentativeManager";
import {Representative} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Representative";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import autobind from "autobind-decorator";
import {SubAdminManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/SubAdminManager";
import {PrincipalAdmin} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/PrincipalAdmin";
import {FormPresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/presenter/FormPresenterViewModel";

export class FormPresenter extends Presenter<FormPresenterViewModel, FormPresenterState> {
    private principalManager: PrincipalManager;
    private representativeManager: RepresentativeManager;
    private subAdminManager: SubAdminManager;

    constructor(principalManager: PrincipalManager, representativeManager: RepresentativeManager, subAdminManager: SubAdminManager) {
        super(new FormPresenterState({
            principals: principalManager.getPrincipals(),
            representatives: representativeManager.getRepresentatives(),
            admins: subAdminManager.getAdmins()
        }));
        this.principalManager = principalManager;
        this.representativeManager = representativeManager;
        this.subAdminManager = subAdminManager;
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
    public onResetAdmins() {
        this.setState(this.state.copyWith({admins: []}))
    }

    @autobind
    public onActiveStateChanged(isActive: boolean) {
        this.setState(this.state.copyWith({isActive: isActive}));
    }

    @autobind
    public onParentActiveStateChanged(isActive: boolean) {
        this.setState(this.state.copyWith({isParentActive: isActive}));
    }

    @autobind
    public onCurrentAdminChange(currentAdmin?: PrincipalAdmin | null): void {
        this.setState(this.state.copyWith({currentAdmin: currentAdmin}));
    }

    @autobind
    public onResetCurrentAdmin(): void {
        this.setState(this.state.copyWith({currentAdmin: new PrincipalAdmin()}));
    }

    // @autobind
    // compare(other: FormPresenterState): boolean {
    //     // return super.compare(other);
    //     return
    // }

    @autobind
    public update() {
        this.setState(this.state.copyWith({
            principals: this.principalManager.getPrincipals(),
            representatives: this.representativeManager.getRepresentatives(),
            admins: this.subAdminManager.getAdmins()
        }));
    }
}
