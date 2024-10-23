import { IState } from '../../types';
import aggregateWaitingOfClarificationDelivered from '../aggregatedStates/WaitingOfClarificationDelivered';

const WaitingOfClarificationDelivered: IState = {
  name: 'waiting_of_clarification_delivered',
  label: 'Ожидание подтверждения получения уведомления об уточнении',
  type: 'IN',
  aggregatedState: aggregateWaitingOfClarificationDelivered
};

export default WaitingOfClarificationDelivered;
