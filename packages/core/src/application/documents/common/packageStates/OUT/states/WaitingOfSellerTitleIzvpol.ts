import { IState } from '../../types';
import WaitingOfNotification from '../aggregatedStates/WaitingOfNotification';

const WaitingOfSellerTitleIzvpol: IState = {
  name: 'waiting_of_seller_title_izvpol',
  label: 'Ожидание извещения о получении',
  type: 'OUT',
  aggregatedState: WaitingOfNotification
};

export default WaitingOfSellerTitleIzvpol;
