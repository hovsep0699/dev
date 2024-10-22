import { IState } from '../../types';
import WaitingEDO from '../aggregatedStates/WaitingEDO';

const WaitingForPdotpr: IState = {
  name: 'waiting_for_pdotpr',
  label: 'Ожидание подтверждения оператора ЭДО',
  type: 'OUT',
  aggregatedState: WaitingEDO
};

export default WaitingForPdotpr;
