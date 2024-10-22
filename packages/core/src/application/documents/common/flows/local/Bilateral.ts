import { IFlow } from '../types';
import Unformalized from '../aggregatedFlows/Unformalized';

const Bilateral: IFlow = {
  name: 'bilateral',
  label: 'Двусторонний документ',
  type: 'local',
  aggregatedFlow: Unformalized
};

export default Bilateral;
