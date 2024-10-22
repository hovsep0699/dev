import React from 'react'
import PoaActionButtonsList from './PoaActionButtonsList'
import PoaTable from './PoaTable'
import {DashboardPresenter} from "../presenter/DashboardPresenter";

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