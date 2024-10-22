import { IState } from '../../types';
import AggregatedWaitingOfAnnulment from '../aggregatedStates/WaitingOfAnnulment';

const WaitingOfAnnulment: IState = {
  name: 'waiting_of_annulment',
  label: 'Ожидается аннулирование',
  type: 'IN',
  aggregatedState: AggregatedWaitingOfAnnulment
};

export default WaitingOfAnnulment;
