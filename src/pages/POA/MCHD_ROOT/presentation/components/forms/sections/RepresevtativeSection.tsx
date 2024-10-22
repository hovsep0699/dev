import React from 'react';
import {Representative} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Representative";
import {RepresentativeManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/RepresentativeManager";
import {CreatePresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenter";
import {useDialog} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/useDialog";
import GlobalVariadicForm from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/GlobalVariadicForm";
import {representativeOptions} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/options/options";
import {RepresentativetypeOptions} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/initialValues/RepresentativeFormInitialValues";
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {CreatePresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterState";
import ModalFormFooter from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/widgets/ModlFormFooter";
import GeneralSectionOptions from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/page/GeneralSectionOptions";
import {serviceLocator} from "@distate/app/src/pages/POA/MCHD_ROOT/di/app_component";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {CreatePresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterViewModel";

interface RepresentativeSectionProps {
    representatives?: Representative[];
    representativeManager: RepresentativeManager;
    presenter: CreatePresenter;
    baseWidth?: string;
}

const RepresentativeSection: React.FC<RepresentativeSectionProps> = ({
                                                                         representatives,
                                                                         representativeManager,
                                                                         presenter,
                                                                         baseWidth
                                                                     }: RepresentativeSectionProps) => {


    const {hideDialog, openDialog} = useDialog();

    const handleSubmit = async (formData: any, index: number, isEditMode: boolean) => {
        if (isEditMode) {
            representativeManager.editRepresentative(index, formData);
        } else
            representativeManager.addRepresentative(formData);

        presenter.update();
        console.log("representatives-----------------");
        console.log(representativeManager.getRepresentatives());

        // setTestPrincipal(manager.getPrincipals());
        console.log(representativeManager.getRepresentatives());
        hideDialog();

    };

    const showForm = async (e: any, index: number, isSubmitting: boolean, isEditMode: boolean) => {
        const selelctedRepresentative = await representativeManager.getRepresentatives()[index];
        // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;",selelctedPrincipal.getFields() ?? '');

        openDialog({
            alignment: "center",
            content:
                <GlobalVariadicForm
                    isSubmitting={isSubmitting}
                    onStateChange={presenter.onFormStateChange}
                    defaultValues={selelctedRepresentative?.getFields() ?? ''}
                    initialFields={representativeOptions}
                    formTypes={RepresentativetypeOptions}
                    handleSubmit={(e: any) => handleSubmit(e, index, isEditMode)}
                    close={hideDialog}
                />,
            position: "fixed",
            maxHeight: "90%",
            width: "704px",
            // maxWidth: "500px",
            footer: <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter> builder={(state) => (
                <ModalFormFooter state={state} onSave={() => presenter.onFormStateChange(null, false, null)}/>
            )} create={() => presenter} buildWhen={(oldState, newState) => {
                return oldState.status !== newState.status || oldState.isSubmitting !== newState.isSubmitting || oldState.handleSubmit !== newState.handleSubmit;
            }}/>,
            title: 'Поиск по МЧД',
        }, e)
    }

    const handleRemoveRepresentative = (index: number) => {
        const updatedPrincipals = [...presenter.getState().representatives];
        updatedPrincipals.splice(index, 1);
        representativeManager.removeRepresentative(index);
        presenter.update();
        console.log("principals-----------------");
        console.log(representativeManager.getRepresentatives());
        console.log("removed");

    };

    return (
        <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
            builder={(state: CreatePresenterState) => (
                <GeneralSectionOptions
                    presenter={serviceLocator.get(SectionPresenter)}
                    sectionData={state.representatives}
                    onShowForm={(e: any, index: number) => showForm(e, index, state.isSubmitting,false)}
                    onRemove={handleRemoveRepresentative}
                    onEdit={(e: any, index: number) => showForm(e, index, state.isSubmitting, true)}
                    baseWidth={baseWidth}
                    isRequired={true}

                    sectionTitle={"Представитель"}
                    getInn={(section) => {
                        const fields: any = section.getFields();
                        if (fields != null && fields.hasOwnProperty("inn") && fields.hasOwnProperty("inn")) {
                            return section?.getFields()["inn"] ?? ""
                        }
                        return "";
                    }}
                />
            )}
            create={() => presenter}
            buildWhen={(oldState, newState) => {
                return !oldState.compare(newState)
            }}
        />
    );
}

export default RepresentativeSection;
