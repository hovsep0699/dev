import React from 'react';
import { Box } from 'grommet';

import IndividualActions from '@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/Individual/IndividualActions';
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {CreatePresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterState";
import {CreatePresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenter";
import GeneralSectionHeader from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/page/GeneralSectionHeader";
import {serviceLocator} from "@distate/app/src/pages/POA/MCHD_ROOT/di/app_component";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {CreatePresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterViewModel";

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
                    presenter={serviceLocator.get(SectionPresenter)}
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
