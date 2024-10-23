import { Box } from 'grommet'
import React from 'react'
import PrincipalSection from './sections/PrincipalSection';
import ObservableComponent from "../../observableComponent/observableComponent";
import RepresentativeSection from "./sections/RepresentativeSection";
import {RepresentativeManager} from "../../../core/RepresentativeManager";
import {PrincipalManager} from "../../../core/PrincipalManager";
import {serviceLocator} from "../../../di/app_component";
import {SubTrustPresenter} from "./presenter/SubTrustPresenter";
import {SubTrustPresenterState} from "./presenter/SubTrustPresenterState";
import {SectionPresenter} from "../Sections/presenter/SectionPresenter";
import {GeneralSectionsFooter} from "../Sections/page/GeneralSectionFooter";
import {SubTrustPresenterViewModel} from "./presenter/SubTrustPresenterViewModel";





interface ActionsButtonProps {
    baseWidth?: string;
    presenter: SubTrustPresenter;
}

const ActionButtons: React.FC<ActionsButtonProps> = ({baseWidth, presenter}: ActionsButtonProps) => {

  return (
        <>
        <Box direction="column" width="100%" gap="20px" margin="40px 0">
            <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
                builder={(state: SubTrustPresenterState) => {
                    console.log("state: ", state);
                    return <>
                        <PrincipalSection
                            principalManager={serviceLocator.get<PrincipalManager>("PrincipalManager")}
                            principals={state.principals}
                            presenter={presenter}
                            baseWidth={baseWidth}
                        />
                        <RepresentativeSection
                            representativeManager={serviceLocator.get<RepresentativeManager>("RepresentativeManager")}
                            presenter={presenter}
                            representatives={state.representatives}
                            baseWidth={baseWidth}
                        />
                        <GeneralSectionsFooter
                            presenter={serviceLocator.get<SectionPresenter>("SectionPresenter")}
                            baseWidth={baseWidth}/>
                    </>
                }}
                create={()=>presenter}
            />

        </Box>
    </>
  )
}

export default ActionButtons