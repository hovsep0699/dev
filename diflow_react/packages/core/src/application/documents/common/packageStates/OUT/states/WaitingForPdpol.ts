import { IState } from '../../types';
import WaitingEDO from '../aggregatedStates/WaitingEDO';

const WaitingForPdpol: IState = {
  name: 'waiting_for_pdpol',
  label: 'Ожидание подтверждения от оператора ЭДО',
  type: 'OUT',
  aggregatedState: WaitingEDO
};

export default WaitingForPdpol;
