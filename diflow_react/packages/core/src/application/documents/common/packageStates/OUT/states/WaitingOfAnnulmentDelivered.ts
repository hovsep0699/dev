import { IState } from '../../types';
import AggregatedWaitingOfAnnulmentDelivered from '../aggregatedStates/WaitingOfAnnulmentDelivered';

const WaitingOfAnnulmentDelivered: IState = {
  name: 'waiting_of_annulment_delivered',
  label: 'Ожидается доставка предложения об аннулировании',
  type: 'OUT',
  aggregatedState: AggregatedWaitingOfAnnulmentDelivered
};

export default WaitingOfAnnulmentDelivered;
