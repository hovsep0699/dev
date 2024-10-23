import React, {useState} from 'react';
import VariadicFormForULAdmin from "../../../components/forms/VaridaicFormForULAdmins";
import ModalFormFooter from "../../../widgets/ModlFormFooter";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {useDialog} from "../../dashboard/modals/useDialog";
import {AlignmentType} from "../../dashboard/modals/Dialog";
import {SubTrustPresenterState} from "../presenter/SubTrustPresenterState";
import {SubTrustPresenter} from "../presenter/SubTrustPresenter";
import GeneralSectionOptions from "../../Sections/page/GeneralSectionOptions";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../Sections/presenter/SectionPresenter";
import {SubTrustPresenterViewModel} from "../presenter/SubTrustPresenterViewModel";

const AdminSectionForm = ({setFieldValue, presenter, baseWidth }: any) => {
    const [admin, setAdmin] = useState<any[]>([]);
    const [isEditMode, setIsEditMode] = useState<any>(false);
    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
    const { hideDialog, openDialog } = useDialog();
      const showAdminForm = (e: any) => {
          openDialog({
              alignment: AlignmentType.left,
              content: <VariadicFormForULAdmin handleSubmit={handleSubmitAdmin} close={hideDialog}/>,
              position: "fixed",
              maxHeight: "90%",
              title: 'Поиск по МЧД',
              footer: <ModalFormFooter state={presenter.getState()}/>,
          }, e)
      }
  
      const handleSubmitAdmin =async (formData: any) => {
        //console.log("pinggg");
        
        if (isEditMode) {
            setAdmin((prevAdmins: any) =>
              prevAdmins.map((adm: any) => adm.inn === selectedAdmin?.inn ? { ...adm, ...formData } : adm)
            );
          } else {
            
            setAdmin((prevAdmins) => [...prevAdmins, formData]);
          }
        //   hideDialog();
          setIsEditMode(false);
          setSelectedAdmin(null);
      };
  
    const handleEditClick = (admin: any) => {
      setSelectedAdmin(admin);
      setFieldValue('Admin', admin);
      setIsEditMode(true);
      
    };
  

  // Function to handle removing an admin
  const handleRemoveAdmin = (index: number) => {
    const updatedAdmin = [...admin];
    updatedAdmin.splice(index, 1);
    //console.log(updatedAdmin);
    setAdmin(updatedAdmin);
  };

  return (
      <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
          builder={(state: SubTrustPresenterState)=>(
              <GeneralSectionOptions
                  presenter={serviceLocator.get(SectionPresenter)}
                  sectionData={admin}
                  onShowForm={showAdminForm}
                  onRemove={handleRemoveAdmin}
                  onEdit={handleEditClick}
                  isRequired={true}
                  baseWidth={baseWidth}
                  sectionTitle={"Руководитель Организации"}
              />
          )}
          create={()=>presenter}
      />
  );
}

export default AdminSectionForm;
