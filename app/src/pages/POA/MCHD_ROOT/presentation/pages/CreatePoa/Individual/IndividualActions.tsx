import { Box } from 'grommet'
import React from 'react'
import ObservableComponent from "../../../observableComponent/observableComponent";
import {CreatePresenterState} from "../presenter/createPresenterState";
import {CreatePresenter} from "../presenter/createPresenter";
import PrincipalSection from "../../../components/forms/sections/PrincipalSection";
import RepresevtativeSection from "../../../components/forms/sections/RepresevtativeSection";
import {GeneralSectionsFooter} from "../../Sections/page/GeneralSectionFooter";
import {serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../Sections/presenter/SectionPresenter";
import {RepresentativeManager} from "../../../../core/RepresentativeManager";
import {PrincipalManager} from "../../../../core/PrincipalManager";
import {CreatePresenterViewModel} from "../presenter/createPresenterViewModel";




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