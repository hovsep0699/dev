import React from "react";
import PoaActionButtonsList from "./PoaActionButtonsList";
import PoaTable from "./PoaTable";
import {useGlobalState} from "../../../../mocks/context/GlobalState";
import {DashboardPresenter} from "../presenter/DashboardPresenter";

interface POADashboardProps {
    presenter: DashboardPresenter;
}

const POADashboard: React.FC<POADashboardProps> = ({presenter}: POADashboardProps) => {
    const [selectedPoa, setSelectedPoa] = React.useState(null);
    const {isCompany, setIsCompany} = useGlobalState()

    return (
        <>
                <PoaActionButtonsList presenter={presenter} selectedPoa={selectedPoa} isCompany={isCompany}/>
                <PoaTable presenter={presenter} setSelectedPoa={setSelectedPoa}/>
        </>
    );
}

export default POADashboard;