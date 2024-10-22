import { IState } from '../../types';
import WaitingEDO from '../aggregatedStates/WaitingEDO';

const WaitingOfPdotprClarification: IState = {
  name: 'waiting_of_pdotpr_clarification',
  label: 'Ожидание подтверждения оператора ЭДО',
  type: 'OUT',
  aggregatedState: WaitingEDO
};

export default WaitingOfPdotprClarification;
