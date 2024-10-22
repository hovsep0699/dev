import React from 'react';
import {useDialog} from "../../dashboard/modals/useDialog";
import {SubTrustPresenter} from "../presenter/SubTrustPresenter";
import {Representative} from "../../../../domain/model/Representative";
import {RepresentativeManager} from "../../../../core/RepresentativeManager";
import GlobalVariadicForm from "../../../components/forms/GlobalVariadicForm";
import {representativeOptions} from "../../../constants/options/options";
import {RepresentativetypeOptions} from "../../../constants/initialValues/RepresentativeFormInitialValues";
import ModlFormFooter from "../../../widgets/ModlFormFooter";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {SubTrustPresenterState} from "../presenter/SubTrustPresenterState";
import GeneralSectionOptions from "../../Sections/page/GeneralSectionOptions";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../Sections/presenter/SectionPresenter";
import {SubTrustPresenterViewModel} from "../presenter/SubTrustPresenterViewModel";

interface RepresentativeSectionProps {
    representatives: Representative[];
    representativeManager: RepresentativeManager;
    presenter: SubTrustPresenter;
    baseWidth?: string;

}

const RepresentativeSection: React.FC<RepresentativeSectionProps> = ({ representatives, representativeManager, presenter, baseWidth }: RepresentativeSectionProps) => {


    const { hideDialog, openDialog } = useDialog();

    const handleSubmit =async ( formData: any, index: number, isEditMode: boolean) => {
        if(isEditMode){
            representativeManager.editRepresentative(index, formData);
        }
        else
            representativeManager.addRepresentative(formData);

        presenter.update();
        console.log("representatives-----------------");
        console.log(representativeManager.getRepresentatives());

        // setTestPrincipal(manager.getPrincipals());
        console.log(representativeManager.getRepresentatives());
        hideDialog();

    };

    const showForm = async  (e: any, index: number, isEditMode: boolean) => {
        // const selelctedRepresentative = await representativeManager.getRepresentatives()[index];
        // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;",selelctedPrincipal.getFields() ?? '');

        openDialog({
            alignment: "center",
            content:
                <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
                    builder={(state)=> (
                        <GlobalVariadicForm
                            isSubmitting={state.isSubmitting}
                            onStateChange={(status, isSubmitting, handleSubmit)=>presenter.onFormStateChange(status, isSubmitting, handleSubmit)}
                            defaultValues={representatives ? representatives[index] ?? '' : ''}
                            initialFields={representativeOptions}
                            formTypes={RepresentativetypeOptions}
                            handleSubmit={(e: any)=>handleSubmit(e, index, isEditMode)}
                            close={hideDialog}
                        />
                    )}
                    create={()=> presenter}
                />,
            position: "fixed",
            maxHeight: "90%",
            width: "704px",
            // maxWidth: "500px",
            footer: <ModlFormFooter state={presenter.getState()} />,
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
      <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
          builder={(state: SubTrustPresenterState)=>(
              <GeneralSectionOptions
                  presenter={serviceLocator.get(SectionPresenter)}
                  sectionData={state.representatives}
                  onShowForm={(e: any, index: number)=>showForm(e, index, false)}
                  onRemove={handleRemoveRepresentative}
                  onEdit={(e: any, index: number)=>showForm(e, index, true)}
                  baseWidth={baseWidth}
                  isRequired={true}
                  sectionTitle={"Представитель"}
                  getInn={(section)=> {
                      const fields: any = section.getFields();
                      if (fields != null && fields.hasOwnProperty("inn") && fields.hasOwnProperty("inn")) {
                          return  section?.getFields()["inn"] ?? ""
                      }
                      return "";
                  }}
              />
          )}
          create={()=>presenter}
          buildWhen={(oldState, newState)=>{
              return oldState.representatives !== newState.representatives
          }}
      />
  );
}

export default RepresentativeSection;
