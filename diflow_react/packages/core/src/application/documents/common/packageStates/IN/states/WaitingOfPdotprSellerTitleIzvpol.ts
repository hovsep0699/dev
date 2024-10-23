import { IState } from '../../types';
import AggregatedWaitingOfPdotprSellerTitleIzvpol from '../aggregatedStates/WaitingOfPdotprSellerTitleIzvpol';

const WaitingOfPdotprSellerTitleIzvpol: IState = {
  name: 'waiting_of_pdotpr_seller_title_izvpol',
  label: 'Ожидание подтверждения оператора ЭДО',
  type: 'IN',
  aggregatedState: AggregatedWaitingOfPdotprSellerTitleIzvpol
};

export default WaitingOfPdotprSellerTitleIzvpol;
