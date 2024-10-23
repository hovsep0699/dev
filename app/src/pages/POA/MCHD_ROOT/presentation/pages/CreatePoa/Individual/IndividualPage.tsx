import React from 'react';
import { Box } from 'grommet';

import IndividualActions from './IndividualActions';
import ObservableComponent from "../../../observableComponent/observableComponent";
import {CreatePresenterState} from "../presenter/createPresenterState";
import {CreatePresenter} from "../presenter/createPresenter";
import GeneralSectionHeader from "../../Sections/page/GeneralSectionHeader";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../Sections/presenter/SectionPresenter";
import {CreatePresenterViewModel} from "../presenter/createPresenterViewModel";

interface IndividualPageProps {
    presenter: CreatePresenter;
}
const IndividualPage: React.FC<IndividualPageProps> = ({presenter}: IndividualPageProps) => {
  return (
    <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
        builder={(state: CreatePresenterState)=> (
            <Box  width="100%">
                <GeneralSectionHeader
                    isCreatePage={true}
                    presenter={serviceLocator.get<SectionPresenter>("SectionPresenter")}
                    baseWidth={"320px"}/>
                <IndividualActions presenter={presenter} baseWidth={"320px"}/>

                {/*<Box direction="row" justify={'between'} gap="10px" style={{zIndex: 3}}>*/}
                {/*    <Button kind={ButtonKinds.Orange} icon={<IconCheck />}>Сохранить</Button>*/}
                {/*    <Button icon={<IconClose />}>Закрыть</Button>*/}
                {/*</Box>*/}
            </Box>
        )}
        create={()=>presenter}
    />

  );
};

export default IndividualPage;
