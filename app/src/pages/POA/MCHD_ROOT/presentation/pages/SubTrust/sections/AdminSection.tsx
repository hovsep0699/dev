import React from 'react';
// import GeneralSectionOptions from "../../SubTrust/sections/GeneralSectionOptions";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {useDialog} from "../../dashboard/modals/useDialog";
import GlobalVariadicForm from "../../../components/forms/GlobalVariadicForm";
import ModalFormFooter from "../../../widgets/ModlFormFooter";
import {SubTrustPresenter} from "../presenter/SubTrustPresenter";
import {PrincipalManager} from "../../../../core/PrincipalManager";
import {SubTrustPresenterState} from "../presenter/SubTrustPresenterState";
import {ulAdminFields} from "../../../constants/options/options";
import {ulAdminOptions} from "../../../constants/initialValues/AdminFormInitialData";
import GeneralSectionOptions from "../../Sections/page/GeneralSectionOptions";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../Sections/presenter/SectionPresenter";
import {SubTrustPresenterViewModel} from "../presenter/SubTrustPresenterViewModel";

interface AdminSectionProps {
    admin: any;
    baseWidth?: string;
    presenter: SubTrustPresenter;
    principalManager: PrincipalManager;
    principalIndex: number;
}

const AdminSection: React.FC<AdminSectionProps> = ({ admin, baseWidth, principalManager, presenter, principalIndex }: AdminSectionProps) => {

    // const presenter = new Presenter<object>({isSubmitting: null, status: null, handleSubmit: null, isEditMode: null});
    const {openDialog, hideDialog} = useDialog();


    const handleSubmitAdmin =async (index: number, formData: any, isEditMode: boolean | null) => {
        if (isEditMode === true) {
            principalManager.getPrincipals()[principalIndex].editAdmin(index,formData);
        }
        else {
            principalManager.addAdminToPrincipal(principalIndex,formData);
        }
        presenter.onEditModeChange(false);

        presenter.update();
        hideDialog();
        // setIsEditMode(false);
        // setSelectedAdmin(null);
    };


    const showAdminForm = (e: any, index: number, defaultAdmin: any, isEditMode: boolean | null) => {
        console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",defaultAdmin, index, e)
        openDialog({
            alignment: "center",
            content:

                <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
                    builder={(state)=> (
                        <GlobalVariadicForm
                            isSubmitting={state.isSubmitting}
                            onStateChange={presenter.onFormStateChange}
                            defaultValues={defaultAdmin ?? ''}
                            initialFields={ulAdminFields}
                            formTypes={ulAdminOptions}
                            handleSubmit={(e: any)=>handleSubmitAdmin(index, e, isEditMode)}
                            close={hideDialog}
                        />
                    )}
                    create={()=>presenter}
                />,
            position: "fixed",
            maxHeight: "90%",
            maxWidth: "704px",
            footer: <ModalFormFooter state={presenter.getState()} />,
            title: 'Поиск по МЧД',
        }, e)
    }
  
    const handleEditClick = ( admin: any) => {
        // manager.getPrincipals()[principalIndex].editAdmin(adminIndex, admin);
        // principalPresenter.update();
      // setSelectedAdmin(admin);
      // setIsEditMode(true);
      
    };
  

  // Function to handle removing an admin
  const handleRemoveAdmin = (index: number) => {
      principalManager.getPrincipals()[principalIndex].removeAdmin(index);
      presenter.update();
    // const updatedAdmin = [...admin];
    // updatedAdmin.splice(index, 1);
    //console.log(updatedAdmin);
    // setAdmin(updatedAdmin);
  };

  return (
      <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter> builder={(state: SubTrustPresenterState) => (
          <GeneralSectionOptions
              presenter={serviceLocator.get<SectionPresenter>("SectionPresenter")}
              sectionData={admin}
              baseWidth={baseWidth}
              onShowForm={(e: any, index: number)=>showAdminForm(e, index, principalIndex, false)}
              onRemove={handleRemoveAdmin}
              getInn={(section) => {
                  if (section.getFields().hasOwnProperty("inn")) {
                      return section.getFields()[section.getFields()["inn"]] ?? "";
                  }
                  return ""
              }}
              onEdit={(e: any, index: number)=> {
                  showAdminForm(e, index, state.principals[principalIndex].getAdmin(index).getFields(), true)
                  // presenter.setState({...state, isEditMode: true});
                  presenter.onEditModeChange(true);
              }}
              isRequired={true}
              sectionTitle={"Руководитель Организации"}
          />
      )} create={() => presenter} />

  );
}

export default AdminSection;
