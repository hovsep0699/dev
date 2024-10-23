import { IAggregatedState } from '../../types';
import Annulled from './Annulled';
import AnnulmentHasBeenRequested from './AnnulmentHasBeenRequested';
import Complete from './Complete';
import Declined from './Declined';
import Interrupted from './Interrupted';
import Processing from './Processing';
import ReceiptSignRequired from './ReceiptSignRequired';
import WaitingOfAnnulment from './WaitingOfAnnulment';
import WaitingForDecision from './WaitingForDecision';
import WaitingOfNotification from './WaitingOfNotification';
import WaitingOfSigning from './WaitingOfSigning';
import Created from './Created';
import Rejected from './Rejected';
import SigningPdpolNotification from './SigningPdpolNotification';
import RoamingWaitingOfSigningDelivered from './RoamingWaitingOfSigningDelivered';
import WaitingForPdpol from './WaitingForPdpol';
import WaitingOfSigningDelivered from './WaitingOfSigningDelivered';
import WaitingOfAnnulmentDelivered from './WaitingOfAnnulmentDelivered';
import WaitingOfClarificationDelivered from './WaitingOfClarificationDelivered';
import WaitingOfNotificationDelivered from './WaitingOfNotificationDelivered';

const outAggregatedStates: IAggregatedState[] = [
  Created,
  Rejected,
  Annulled,
  SigningPdpolNotification,
  AnnulmentHasBeenRequested,
  RoamingWaitingOfSigningDelivered,
  Complete,
  Declined,
  Interrupted,
  Processing,
  WaitingOfClarificationDelivered,
  WaitingOfNotificationDelivered,
  ReceiptSignRequired,
  WaitingOfAnnulment,
  WaitingOfNotification,
  WaitingOfSigning,
  WaitingForPdpol,
  WaitingForDecision,
  WaitingOfAnnulmentDelivered,
  WaitingOfSigningDelivered
];

export default outAggregatedStates;
