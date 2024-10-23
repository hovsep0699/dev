import React  from 'react'
import { Box } from 'grommet';
import IndividualPage from '../Individual/IndividualPage';
import ObservableComponent from "../../../observableComponent/observableComponent";
import Button, {ButtonKinds} from "../../../../common/Button";
import {IconCheck, IconClose} from "../../../../assets/icons";
import {CreatePresenter} from "../presenter/createPresenter";
import {CreatePresenterState} from "../presenter/createPresenterState";
import {poaConfig, serviceLocator} from "../../../../di/app_component";
import {CreateService} from "../../../../core/network/CreateService";
import {JsonCreateManager} from "../../../../core/JsonManager";
import {CreatePresenterViewModel} from "../presenter/createPresenterViewModel";
import {Loading} from "@distate/components";


interface CreatePoaProps {
    presenter: CreatePresenter;
}


const CreatePoa: React.FC<CreatePoaProps> = ({presenter}: CreatePoaProps) => {
    console.log("sssssss: ", presenter.getState().toFlatJson());
    const createService = serviceLocator.get(CreateService);
    const jsonCreate = serviceLocator.get(JsonCreateManager);
    const isLoading = poaConfig.isInitialized();
    if (!isLoading) {
        return <Loading />;
    }
  return (
      <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
          builder={(state: CreatePresenterState)=> (
              <Box direction="column" width={"100%"}>
                  <IndividualPage presenter={presenter}/>
                  <Box direction="row" margin={{top: "medium"}} justify={'between'} style={{zIndex: 3}} gap="10px">
                      <Button kind={ButtonKinds.Orange} icon={<IconCheck fill={"white"}/>} onClick={()=>{
                           console.log(`JSON:::::: ${state}`)
                          // const blob = new Blob([JSON.stringify(state.toFlatJson(), null, 2)], { type: 'application/json' });
                          //
                          // const link = document.createElement('a');
                          // link.href = URL.createObjectURL(blob);
                          // link.download = 'response.json';
                          //
                          // link.click();
                            // createService.createPOA(state.toFlatJson());
                          console.log("JSON:::: ", jsonCreate.toFlatJson());
                            createService.createPOA(jsonCreate.toFlatJson());
                          //   createService.createPOA(assign3);
                            // createService.createPOA(mockData[3]);
                            // createService.createPOA(mockData[4]);
                      }}>
                          Сохранить
                      </Button>
                      <Button icon={<IconClose />}>Закрыть</Button>
                  </Box>

              </Box>
          )}
          create={()=>presenter}
      />
  )

}

export default CreatePoa