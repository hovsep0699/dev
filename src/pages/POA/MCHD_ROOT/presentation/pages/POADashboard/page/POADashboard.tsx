import React from "react";
import PoaActionButtonsList from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/POADashboard/page/PoaActionButtonsList";
import PoaTable from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/POADashboard/page/PoaTable";
import {useGlobalState} from "@distate/app/src/pages/POA/MCHD_ROOT/mocks/context/GlobalState";
import {DashboardPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/POADashboard/presenter/DashboardPresenter";

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