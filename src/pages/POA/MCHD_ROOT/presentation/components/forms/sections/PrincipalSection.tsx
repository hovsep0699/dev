import React from 'react';
import AdminSection from '@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/sections/AdminSection';
import GlobalVariadicForm from '@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/GlobalVariadicForm';
import {CreatePresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenter";
import {PrincipalManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/PrincipalManager";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import {useDialog} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/useDialog";
import {principaloptionsvalues} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/options/options";
import {PrincipaltypeOptions} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/initialValues/PrincipalFormInitialValues";
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {CreatePresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterState";
import ModalFormFooter from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/widgets/ModlFormFooter";
import GeneralSectionOptions from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/page/GeneralSectionOptions";
import {serviceLocator} from "@distate/app/src/pages/POA/MCHD_ROOT/di/app_component";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {FormPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/presenter/FormPresenter";
import {SubAdminManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/SubAdminManager";
import {CreatePresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterViewModel";
import {PrincipalAdmin} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/PrincipalAdmin";

interface PrincipalSectionProps {
    presenter: CreatePresenter;
    principalManager: PrincipalManager;
    principals: Principal[];
    baseWidth?: string;
}

const PrincipalSection: React.FC<PrincipalSectionProps> = ({
                                                               principals,
                                                               principalManager,
                                                               presenter,
                                                               baseWidth
                                                           }: PrincipalSectionProps) => {



    const {hideDialog, openDialog} = useDialog();

    const handleSubmit = async (formData: any, index: number, isEditMode: boolean) => {
        if (isEditMode) {
            principalManager.editPrincipal(index, formData);
        } else
            principalManager.addPrincipal(formData);

        presenter.update();

        hideDialog();

    };

    const showForm = async (e: any, index: number, isSubmitting: boolean, isEditMode: boolean) => {
        const selelctedPrincipal = await principalManager.getPrincipals()[index];

        openDialog({
            alignment: "center",
            content: <GlobalVariadicForm
                isSubmitting={isSubmitting}
                onStateChange={presenter.onFormStateChange}
                defaultValues={selelctedPrincipal?.getFields() ?? ''}
                initialFields={principaloptionsvalues}
                formTypes={PrincipaltypeOptions}
                handleSubmit={(e: any) => handleSubmit(e, index, isEditMode)}
                close={hideDialog}
            />,
            position: "fixed",
            width: "704px",
            maxHeight: "90%",
            footer: <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
                builder={(state) => (
                    <ModalFormFooter
                        state={state}
                        onSave={() => presenter.onFormStateChange(null, true, null)}
                    />
                )}
                create={() => presenter}
            />,

            title: 'Поиск по МЧД',
        }, e)
    }

    const handleRemovePrincipal = (index: number) => {
        const updatedPrincipals = [...presenter.getState().principals];
        updatedPrincipals.splice(index, 1);
        principalManager.removePrincipal(index);
        presenter.update();

    };



    return (
        <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
            builder={(state: CreatePresenterState) => {
                return (
                    <GeneralSectionOptions
                        presenter={serviceLocator.get(SectionPresenter)}
                        sectionData={state.principals}
                        onShowForm={(e: any, index: number) => showForm(e, index, state.isSubmitting, false)}
                        onRemove={handleRemovePrincipal}
                        onEdit={(e: any, index: number) => showForm(e, index, state.isSubmitting, true)}
                        baseWidth={baseWidth}
                        // expandedWidth={expandedWidth}
                        isRequired={true}

                        sectionTitle={"Доверитель"}
                        getInn={(section) => section?.getFields()["inn"] ?? ""}
                        builder={(index: number, principal?: Principal) => {
                            const fields: any = principal?.getFields();
                            if (fields != null && fields.hasOwnProperty("type") && fields.hasOwnProperty("type")) {
                                return fields.type !== 'IP' && (
                                    <AdminSection
                                        subAdminManager={serviceLocator.get(SubAdminManager)}
                                        formPresenter={serviceLocator.get(FormPresenter)}
                                        presenter={presenter}
                                        principalManager={serviceLocator.get(PrincipalManager)}
                                        admin={principal?.getAdmins() ?? new Array<PrincipalAdmin>()}
                                        principalIndex={index}/>
                                )
                            } else {
                                return null;
                            }
                        }
                        }
                    />
                );
            }}
            create={() => presenter}
            buildWhen={(oldState, newState) => {
                return !oldState.compare(newState)
            }}
        />
    );
}

export default PrincipalSection;



