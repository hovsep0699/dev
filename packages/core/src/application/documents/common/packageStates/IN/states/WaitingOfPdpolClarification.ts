import { IState } from '../../types';
import WaitingEDO from '../aggregatedStates/WaitingEDO';

const WaitingOfPdpolClarification: IState = {
  name: 'waiting_of_pdpol_clarification',
  label: 'Ожидание подтверждения оператора ЭДО',
  type: 'OUT',
  aggregatedState: WaitingEDO
};

export default WaitingOfPdpolClarification;
