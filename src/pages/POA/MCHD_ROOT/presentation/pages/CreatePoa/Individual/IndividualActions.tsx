import { Box } from 'grommet'
import React from 'react'
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {CreatePresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterState";
import {CreatePresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenter";
import PrincipalSection from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/sections/PrincipalSection";
import RepresevtativeSection from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/sections/RepresevtativeSection";
import {GeneralSectionsFooter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/page/GeneralSectionFooter";
import {serviceLocator} from "@distate/app/src/pages/POA/MCHD_ROOT/di/app_component";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {RepresentativeManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/RepresentativeManager";
import {PrincipalManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/PrincipalManager";
import {CreatePresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterViewModel";




interface IndividualActionsProps {
    baseWidth?: string;
    presenter: CreatePresenter;
}

const IndividualActions: React.FC<IndividualActionsProps> = ({baseWidth, presenter}: IndividualActionsProps) => {
  return (
        <>
        <Box direction="column" width="100%" gap="20px" margin="40px 0">
            <ObservableComponent<CreatePresenterViewModel, CreatePresenterState, CreatePresenter>
                builder={(state: CreatePresenterState) => {
                    console.log("state: ", state.principals);
                    return <>
                        <PrincipalSection
                            principalManager={serviceLocator.get(PrincipalManager)}
                            presenter={presenter}
                            principals={state.principals}
                            baseWidth={baseWidth}
                        />
                        <RepresevtativeSection
                            representativeManager={serviceLocator.get(RepresentativeManager)}
                            presenter={presenter}
                            representatives={state.representatives}
                            baseWidth={baseWidth}
                        />
                        <GeneralSectionsFooter
                            presenter={serviceLocator.get(SectionPresenter)}
                            baseWidth={baseWidth}/>
                    </>
                }}
                create={()=>presenter}
                buildWhen={(oldState: CreatePresenterState, newState: CreatePresenterState)=> {
                    return !oldState.compare(newState);
                }}
            />

        </Box>
    </>
  )
}

export default IndividualActions