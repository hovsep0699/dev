import { IAggregatedState } from '../../types';

const WaitingForPdpol: IAggregatedState = {
  name: 'waiting_for_pdpol',
  label: 'Ожидание подтверждения от оператора ЭДО',
  type: 'OUT'
};

export default WaitingForPdpol;
