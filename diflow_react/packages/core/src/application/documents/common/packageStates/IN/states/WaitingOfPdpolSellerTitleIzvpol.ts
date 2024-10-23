import { IState } from '../../types';
import WaitingEDO from '../aggregatedStates/WaitingEDO';

const WaitingOfPdpolSellerTitleIzvpol: IState = {
  name: 'waiting_of_pdpol_seller_title_izvpol',
  label: 'Ожидание подтверждения оператора ЭДО',
  type: 'OUT',
  aggregatedState: WaitingEDO
};

export default WaitingOfPdpolSellerTitleIzvpol;
