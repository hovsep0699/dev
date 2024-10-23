import React from 'react';
import {Representative} from "../../../../domain/model/Representative";
import {RepresentativeManager} from "../../../../core/RepresentativeManager";
import {CreatePresenter} from "../../../pages/CreatePoa/presenter/createPresenter";
import {useDialog} from "../../../pages/dashboard/modals/useDialog";
import GlobalVariadicForm from "../GlobalVariadicForm";
import {representativeOptions} from "../../../constants/options/options";
import {RepresentativetypeOptions} from "../../../constants/initialValues/RepresentativeFormInitialValues";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {CreatePresenterState} from "../../../pages/CreatePoa/presenter/createPresenterState";
import ModalFormFooter from "../../../widgets/ModlFormFooter";
import GeneralSectionOptions from "../../../pages/Sections/page/GeneralSectionOptions";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../../pages/Sections/presenter/SectionPresenter";
import {CreatePresenterViewModel} from "../../../pages/CreatePoa/presenter/createPresenterViewModel";

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
