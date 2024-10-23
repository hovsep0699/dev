import React from 'react';
import AdminSection from './AdminSection';
import ObservableComponent from "../../../observableComponent/observableComponent";
import { useDialog } from '../../dashboard/modals/useDialog';
import GlobalVariadicForm from "../../../components/forms/GlobalVariadicForm";
import ModalFormFooter from "../../../widgets/ModlFormFooter";
import {PrincipalManager} from "../../../../core/PrincipalManager";
import {Principal} from "../../../../domain/model/Principal";
import {SubTrustPresenter} from "../presenter/SubTrustPresenter";
import {principaloptionsvalues} from "../../../constants/options/options";
import {PrincipalULAdminTypeOptions} from "../../../constants/initialValues/PrincipalFormInitialValues";
import {SubTrustPresenterState} from "../presenter/SubTrustPresenterState";
import {serviceLocator} from "../../../../di/app_component";
import GeneralSectionOptions from "../../Sections/page/GeneralSectionOptions";
import {SectionPresenter} from "../../Sections/presenter/SectionPresenter";
import {SubTrustPresenterViewModel} from "../presenter/SubTrustPresenterViewModel";

interface PrincipalSectionProps {
    principals: Principal[];

    baseWidth?: string;
    principalManager: PrincipalManager;
    presenter: SubTrustPresenter;
    showAdminForm?: (e: any)=>void;
    expandedWidth?: string;
}

const  PrincipalSection: React.FC<PrincipalSectionProps> = ({principals, presenter, principalManager, baseWidth, showAdminForm, expandedWidth }: PrincipalSectionProps) => {

  // const [testPrincipal, setTestPrincipal] = useState(manager.getPrincipals());
  //
  // useEffect(() => {
  //   setTestPrincipal(manager.getPrincipals());
  // }, [testPrincipal]);

console.log("[[[[[[[[[]]]]]]]]]]",principals);


  const { hideDialog, openDialog } = useDialog();

  const handleSubmit =async ( formData: any,index: number, isEditMode: boolean) => {
    if(isEditMode){
        principalManager.editPrincipal(index, formData);
    }
    else
        principalManager.addPrincipal(formData);
    
      presenter.update();
      console.log("principals-----------------");
      console.log(principalManager.getPrincipals());
      
      // setTestPrincipal(manager.getPrincipals());
      console.log(principalManager.getPrincipals());
      hideDialog();
      
  };

  const showForm = async(e: any, index: number, isEditMode: boolean) => {
    const selelctedPrincipal =await principalManager.getPrincipals()[index];
    // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;",selelctedPrincipal.getFields() ?? '');
    
    openDialog({
        alignment: "center",
        content:
            <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
                builder={(state)=>(
                    <GlobalVariadicForm
                        isSubmitting={state.isSubmitting}
                        onStateChange={presenter.onFormStateChange}
                        defaultValues={selelctedPrincipal?.getFields() ?? ''}
                        initialFields={principaloptionsvalues}
                        formTypes={PrincipalULAdminTypeOptions}
                        handleSubmit={(e: any)=>handleSubmit(e, index, isEditMode)}
                        close={hideDialog}
                    />
                )}
                create={()=>presenter}
            />,
        position: "fixed",
        maxHeight: "90%",
        width: "704px",
        footer: <ModalFormFooter state={presenter.getState()}/>,
        // positionOffset: {
        //   top: "10%",
        //   left: "10%"
        //
        // },
        title: 'Поиск по МЧД',
    }, e)
}


  // const [admin, setAdmin] = useState<object[]>([]);
  // const [selectedAdmin, setSelectedAdmin] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemovePrincipal = (index: number) => {
    const updatedPrincipals = [...presenter.getState().principals];
    updatedPrincipals.splice(index, 1);
    principalManager.removePrincipal(index);
    // setTestPrincipal(manager.getPrincipals().splice(index, 1));
    presenter.update();
    console.log("principals-----------------");
    console.log(principalManager.getPrincipals());
    console.log("removed");
    
  };

  console.log("principals");
  console.log();


  
  return (
    <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
        builder={(state: SubTrustPresenterState)=>(
            <GeneralSectionOptions
                presenter={serviceLocator.get(SectionPresenter)}
                sectionData={state.principals}
                onShowForm={(e: any, index:number)=>showForm(e, index, false)}
                onRemove={handleRemovePrincipal}
                onEdit={(e: any, index:number)=>showForm(e, index, true)}
                baseWidth={baseWidth}
                expandedWidth={expandedWidth}
                isRequired={true}
                sectionTitle={"Доверитель"}
                getInn={(section: any)=> section.getFields()["inn"]}
                builder={(index: number, principal: any)=>{
                    return principal?.getFields()["type"] !== 'IP' && (
                        <AdminSection
                            principalManager={serviceLocator.get(PrincipalManager)}
                            presenter={presenter}
                            admin={principal.getAdmins()}
                            principalIndex={index}
                        />
                    )}
                }
            />
        )}
        create={()=>presenter}
    />
  );
}

export default PrincipalSection;



