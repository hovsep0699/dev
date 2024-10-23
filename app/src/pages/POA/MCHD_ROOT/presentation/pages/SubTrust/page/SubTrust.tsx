import React from "react";
import {Box} from "grommet";
import {IconCheck, IconClose} from "../../../../assets/icons";
import Button, {ButtonKinds} from "../../../../common/Button";
import ActionButtons from "../ActionButtons";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {SubTrustPresenter} from "../presenter/SubTrustPresenter";
import {SubTrustPresenterState} from "../presenter/SubTrustPresenterState";
import GeneralSectionHeader from "../../Sections/page/GeneralSectionHeader";
import {poaConfig, serviceLocator} from "../../../../di/app_component";
import {SectionPresenter} from "../../Sections/presenter/SectionPresenter";
import {SubTrustPresenterViewModel} from "../presenter/SubTrustPresenterViewModel";
import {Loading} from "@distate/components";


interface SubTrustProps {
    labelStyle?: object;
    paddingLeft?: string;
    paddingRight?: string;
    baseWidth?: string;
    presenter: SubTrustPresenter;
    // padding?: EdgeInsets;
}

const SubTrust: React.FC<SubTrustProps> = ({
    labelStyle,
    baseWidth,
    presenter,
    paddingRight,
    paddingLeft
}: SubTrustProps) => {
    const isLoading = poaConfig.isInitialized();
    if (!isLoading) {
        return <Loading />;
    }
    return (
        <ObservableComponent<SubTrustPresenterViewModel, SubTrustPresenterState, SubTrustPresenter>
            builder={(state: SubTrustPresenterState) => (
                <Box
                    direction="column"
                    width={"100%"}
                    gap={"10px"}
                >
                    <GeneralSectionHeader
                        isCreatePage={false}
                        presenter={serviceLocator.get(SectionPresenter)}
                        baseWidth={baseWidth}
                        rootAttorney={"Уникальный номер доверенности"}
                        machineReadable={"Внутренный номер доверенности"}
                    />
                    <ActionButtons
                        presenter={presenter}
                        baseWidth={baseWidth}
                    />
                    <Box direction="row" margin={{top: "medium"}} justify={'between'} style={{zIndex: 3}} gap="10px">
                        <Button kind={ButtonKinds.Orange} icon={<IconCheck fill={"white"}/>}
                                onClick={() => {
                                    console.log("JSON:::: ", state.toFlatJson());
                                }}
                        >
                            Сохранить
                        </Button>
                        <Button icon={<IconClose/>}>Закрыть</Button>
                    </Box>
                </Box>
            )}
            create={() => presenter}/>
    )
}


export default SubTrust;