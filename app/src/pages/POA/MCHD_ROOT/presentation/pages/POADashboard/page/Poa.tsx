import React from 'react'
import PoaActionButtonsList from '@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/POADashboard/page/PoaActionButtonsList'
import PoaTable from '@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/POADashboard/page/PoaTable'
import {DashboardPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/POADashboard/presenter/DashboardPresenter";

interface POAProps {
  presenter: DashboardPresenter;
}

const Poa: React.FC<POAProps> = ({presenter}: POAProps) => {
    const [selectedPoa, setSelectedPoa] = React.useState(null);
  return (
    <>
    <PoaActionButtonsList presenter={presenter} selectedPoa={selectedPoa} isCompany={false} />
    <PoaTable presenter={presenter} setSelectedPoa={setSelectedPoa}/>
    </>
  )
}

export default Poa