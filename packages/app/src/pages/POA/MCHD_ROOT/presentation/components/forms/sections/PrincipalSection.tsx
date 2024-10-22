import React from 'react';
import AdminSection from './AdminSection';
import GlobalVariadicForm from '../GlobalVariadicForm';
import {CreatePresenter} from "../../../pages/CreatePoa/presenter/createPresenter";
import {PrincipalManager} from "../../../../core/PrincipalManager";
import {Principal} from "../../../../domain/model/Principal";
import {useDialog} from "../../../pages/dashboard/modals/useDialog";
import {principaloptionsvalues} from "../../../constants/options/options";
import {PrincipaltypeOptions} from "../../../constants/initialValues/PrincipalFormInitialValues";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {CreatePresenterState} from "../../../pages/CreatePoa/presenter/createPresenterState";
import ModalFormFooter from "../../../widgets/ModlFormFooter";
import GeneralSectionOptions from "../../../pages/Sections/page/GeneralSectionOptions";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../../pages/Sections/presenter/SectionPresenter";
import {FormPresenter} from "../presenter/FormPresenter";
import {SubAdminManager} from "../../../../core/SubAdminManager";
import {CreatePresenterViewModel} from "../../../pages/CreatePoa/presenter/createPresenterViewModel";
import {PrincipalAdmin} from "../../../../domain/model/PrincipalAdmin";

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



