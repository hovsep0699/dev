import React from 'react';
import GlobalVariadicForm from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/GlobalVariadicForm";
import ModalFormFooter from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/widgets/ModlFormFooter";
import {useDialog} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/useDialog";
import {PrincipalManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/PrincipalManager";
import {ulAdminFields} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/options/options";
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {PrincipalULAdminTypeOptions} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/initialValues/PrincipalFormInitialValues";
import {CreatePresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenter";
import {CreatePresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterState";
import GeneralSectionOptions from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/page/GeneralSectionOptions";
import {serviceLocator} from "@distate/app/src/pages/POA/MCHD_ROOT/di/app_component";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {AdminFlFields, inUlAdminOptions} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/initialValues/AdminFormInitialData";
import {FormPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/presenter/FormPresenter";
import {FormPresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/presenter/FormPresenterState";
import {SubAdminManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/SubAdminManager";
import {FormPresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/presenter/FormPresenterViewModel";
import {CreatePresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterViewModel";
import {SubAdmin} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/SubAdmin";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import {PrincipalAdmin} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/PrincipalAdmin";

interface AdminSectionProps {
    admin: any;
    presenter: CreatePresenter;
    formPresenter: FormPresenter;
    principalManager: PrincipalManager;
    subAdminManager: SubAdminManager;
    baseWidth?: string;
    principalIndex: number;
}

const AdminSection: React.FC<AdminSectionProps> = ({
                                                       admin,
                                                       presenter,
                                                       formPresenter,
                                                       subAdminManager,
                                                       principalManager,
                                                       baseWidth,
                                                       principalIndex
                                                   }: AdminSectionProps) => {

    const {openDialog, hideDialog, hideAllDialogs} = useDialog();


    const handleSubmitAdmin = async (index: number, formData: any, isEditMode: boolean | null) => {
        const principal: Principal | null = principalManager.getPrincipals()[principalIndex];
        if (isEditMode === true) {
            principal.editAdmin(index, formData);
            principal.getAdmin(index).changeAdmins(formPresenter.getState().currentAdmin.getAdmins());
        } else {
            principalManager.addAdminToPrincipal(principalIndex, formData);
            const len = principalManager.getPrincipals()[principalIndex].getAdmins().length;
            principal.getAdmin(len - 1).changeAdmins(formPresenter.getState().currentAdmin.getAdmins());
        }
        presenter.update();
    };

    const handleSubmitSubAdmin = async (formData: any, index: number, adminIndex: number, isEditMode: boolean | null) => {
        const currentAdmin: PrincipalAdmin | null = formPresenter.getState().currentAdmin;

        if (isEditMode === true) {
            currentAdmin.editAdmin(adminIndex, formData);
        } else {
            currentAdmin.addAdmin(formData);
        }
        formPresenter.onCurrentAdminChange(currentAdmin);
    }

    const handleRemoveSubAdmin = async (index: number, adminIndex: number, state: FormPresenterState) => {
        const currentAdmin = state.currentAdmin;
        currentAdmin.removeAdmin(index);
        formPresenter.onCurrentAdminChange(currentAdmin);
    }

    const showSubAdminForm = async (e: any, index: number, defaultAdmin: PrincipalAdmin | null, adminIndex: number, isEditMode: boolean, callback: any, state: FormPresenterState) => {
        const selelctedAdmin: SubAdmin | null = state.currentAdmin.getAdmins()[index];
        formPresenter.onActiveStateChanged(true);
        formPresenter.onParentActiveStateChanged(false);


        return openDialog({
            alignment: "center",
            content:
                <GlobalVariadicForm
                    formID={1}
                    key={adminIndex}
                    isValidating={true}
                    isSubmitting={state.isSubmitting}
                    onStateChange={formPresenter.onFormStateChange}
                    defaultValues={selelctedAdmin?.getFields() ?? {}}
                    admins={state.currentAdmin?.getAdmins() ?? new Array<SubAdmin>()}
                    adminIndex={adminIndex}
                    initialFields={{'SUBADMINFL': AdminFlFields}}
                    formTypes={inUlAdminOptions}
                    handleSubmit={(e: any) => {
                        handleSubmitSubAdmin(e, index, adminIndex, isEditMode);
                        if (callback) {
                            callback!(e);
                        }
                    }}
                    closeOnSubmit={() => {
                        console.log(",,,,,,,,,,,,,,,,,,,,,,,, ::: ", Array.isArray(defaultAdmin?.getAdmins()));
                        if (defaultAdmin) {
                            principalManager.getPrincipals()[principalIndex].changeAdmin(adminIndex, state.currentAdmin);
                        }
                        else {
                            principalManager.getPrincipals()[principalIndex].addAdmin(state.currentAdmin);
                        }
                        presenter.update();
                        // formPresenter.onActiveStateChanged(false);
                        // formPresenter.onParentActiveStateChanged(true);
                        hideDialog();
                    }}
                    close={() => {
                        formPresenter.onResetCurrentAdmin();
                        formPresenter.onParentActiveStateChanged(true);
                        hideAllDialogs();
                    }}

                />,
            position: "fixed",
            width: "704px",
            maxHeight: "90%",
            footer:
                <ObservableComponent<FormPresenterViewModel, FormPresenterState, FormPresenter>
                    builder={(state: FormPresenterState) => (
                        <ModalFormFooter
                            state={state}
                            onSave={() => {
                                formPresenter.onFormStateChange(null, true, null)
                                formPresenter.onActiveStateChanged(false);
                                formPresenter.onParentActiveStateChanged(true);

                            }}
                        />
                    )}
                    create={() => formPresenter}
                />,
            shouldCloseMultiple: true,
            title: 'Поиск по МЧД',
        }, e)
    }


    const showAdminForm = async (e: any, index: number, defaultAdmin: PrincipalAdmin | null, isEditMode: boolean, state: CreatePresenterState, formState: FormPresenterState) => {
        console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM", defaultAdmin?.getAdmins(), index, e)
        formPresenter.onCurrentAdminChange(defaultAdmin);
        openDialog({
            alignment: "center",
            content:

                <GlobalVariadicForm
                    formID={0}
                    isValidating={formState.isParentActive}
                    isSubmitting={state.isSubmitting}
                    onStateChange={presenter.onFormStateChange}
                    handleSubmitSubAdmin={(formData: any, adminIndex: any, callback: any) => {
                        showSubAdminForm(formData, adminIndex, defaultAdmin, index, false, callback, formState)
                    }}
                    handleEditSubAdmin={(formData: any, adminIndex: any, callback: any) => {
                        showSubAdminForm(formData, adminIndex, defaultAdmin, index, true, callback, formState)
                    }}
                    handleRemoveSubAdmin={(formData: any, adminIndex: any) => {
                        handleRemoveSubAdmin(index, adminIndex, formState)
                    }}
                    defaultValues={defaultAdmin?.getFields() ?? {}}
                    admins={defaultAdmin?.getAdmins() ?? new Array<SubAdmin>()}
                    initialFields={ulAdminFields}
                    formTypes={PrincipalULAdminTypeOptions}
                    handleSubmit={(e: any) => handleSubmitAdmin(index, e, isEditMode)}
                    close={() => {
                        hideDialog();
                    }}
                />,
            position: "fixed",
            width: "704px",
            maxHeight: "90%",
            footer: (
                <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
                    builder={(state) => (
                        <ModalFormFooter state={state} onSave={() => {
                            presenter.onFormStateChange("", true, null)
                        }}/>
                    )} create={() => presenter}/>
            ),
            shouldOpenMultiple: true,
            title: 'Поиск по МЧД',
        }, e)
    }


    // Function to handle removing an admin
    const handleRemoveAdmin = async (index: number) => {
        principalManager.getPrincipals()[principalIndex].removeAdmin(index);
        presenter.update();
    };

    return (
        <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
            builder={(state: CreatePresenterState) => (
                <ObservableComponent<FormPresenterViewModel, FormPresenterState, FormPresenter>
                    builder={(formState: FormPresenterState) => (
                        <GeneralSectionOptions
                            presenter={serviceLocator.get(SectionPresenter)}
                            sectionData={admin}
                            baseWidth={baseWidth}
                            onShowForm={async (e: any, index: number) => {
                                const defaultAdmin = state.principals[principalIndex].getAdmin(index)
                                await showAdminForm(e, index, defaultAdmin, false, state, formState)
                                // if (defaultAdmin) {
                                //     principalManager.getPrincipals()[principalIndex].changeAdmin(index, formState.currentAdmin);
                                // }
                                // else {
                                //     principalManager.getPrincipals()[principalIndex].addAdmin(formState.currentAdmin);
                                // }
                                presenter.update();
                            }}
                            onRemove={handleRemoveAdmin}
                            getInn={(section) => {
                                if (section.getFields().hasOwnProperty("inn")) {
                                    return section?.getFields()["inn"] ?? ""
                                }
                                return ""
                            }}
                            onEdit={async (e: any, index: number) => {
                                const defaultAdmin: PrincipalAdmin | null = state.principals[principalIndex].getAdmin(index)
                                await showAdminForm(e, index, defaultAdmin, true, state, formState)
                                // if (defaultAdmin) {
                                //     principalManager.getPrincipals()[principalIndex].changeAdmin(index, formState.currentAdmin);
                                // }
                                // else {
                                //     principalManager.getPrincipals()[principalIndex].addAdmin(formState.currentAdmin);
                                // }
                                presenter.update();
                            }}
                            isRequired={true}
                            sectionTitle={"Руководитель Организации"}

                        />
                    )}
                    create={() => formPresenter}
                />
            )}
            create={() => presenter}
        />
    );
}

export default AdminSection;
