import { IState } from '../../types';
import AggregatedAnnulled from '../aggregatedStates/Annulled';

const Annulled: IState = {
  name: 'annulled',
  label: 'Аннулирован',
  type: 'OUT',
  aggregatedState: AggregatedAnnulled
};

export default Annulled;
