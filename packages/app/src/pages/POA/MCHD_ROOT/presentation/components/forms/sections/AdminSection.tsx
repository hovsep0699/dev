import React from 'react';
import GlobalVariadicForm from "../GlobalVariadicForm";
import ModalFormFooter from "../../../../presentation/widgets/ModlFormFooter";
import {useDialog} from "../../../pages/dashboard/modals/useDialog";
import {PrincipalManager} from "../../../../core/PrincipalManager";
import {ulAdminFields} from "../../../constants/options/options";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {PrincipalULAdminTypeOptions} from "../../../constants/initialValues/PrincipalFormInitialValues";
import {CreatePresenter} from "../../../pages/CreatePoa/presenter/createPresenter";
import {CreatePresenterState} from "../../../pages/CreatePoa/presenter/createPresenterState";
import GeneralSectionOptions from "../../../pages/Sections/page/GeneralSectionOptions";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../../pages/Sections/presenter/SectionPresenter";
import {AdminFlFields, inUlAdminOptions} from "../../../constants/initialValues/AdminFormInitialData";
import {FormPresenter} from "../presenter/FormPresenter";
import {FormPresenterState} from "../presenter/FormPresenterState";
import {SubAdminManager} from "../../../../core/SubAdminManager";
import {FormPresenterViewModel} from "../presenter/FormPresenterViewModel";
import {CreatePresenterViewModel} from "../../../pages/CreatePoa/presenter/createPresenterViewModel";
import {SubAdmin} from "../../../../domain/model/SubAdmin";
import {Principal} from "../../../../domain/model/Principal";
import {PrincipalAdmin} from "../../../../domain/model/PrincipalAdmin";

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
