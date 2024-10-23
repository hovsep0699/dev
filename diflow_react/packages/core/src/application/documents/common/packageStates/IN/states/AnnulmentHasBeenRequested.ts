import { IState } from '../../types';
import AggregatedAnnulmentHasBeenRequested from '../aggregatedStates/AnnulmentHasBeenRequested';

const AnnulmentHasBeenRequested: IState = {
  name: 'annulment_has_been_requested',
  label: 'Запрос на аннулирование',
  type: 'IN',
  aggregatedState: AggregatedAnnulmentHasBeenRequested
};

export default AnnulmentHasBeenRequested;
