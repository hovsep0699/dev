import React from "react";
import PoaActionButtonsList from "./PoaActionButtonsList";
import PoaTable from "./PoaTable";
import {useGlobalState} from "../../../../mocks/context/GlobalState";
import {DashboardPresenter} from "../presenter/DashboardPresenter";
import {poaConfig} from "../../../../di/app_component";
import {Loading} from "@distate/components";

interface POADashboardProps {
    presenter: DashboardPresenter;
}

const POADashboard: React.FC<POADashboardProps> = ({presenter}: POADashboardProps) => {
    const [selectedPoa, setSelectedPoa] = React.useState(null);
    const {isCompany, setIsCompany} = useGlobalState()
    const isLoading = poaConfig.isInitialized();
    if (!isLoading) {
        return <Loading />;
    }
    return (
        <>
                <PoaActionButtonsList presenter={presenter} selectedPoa={selectedPoa} isCompany={isCompany}/>
                <PoaTable presenter={presenter} setSelectedPoa={setSelectedPoa}/>
        </>
    );
}

export default POADashboard;