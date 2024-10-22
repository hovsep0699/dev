import { IState } from '../../types';
import Annulled from './Annulled';
import AnnulmentHasBeenRequested from './AnnulmentHasBeenRequested';
import Complete from './Complete';
import Declined from './Declined';
import Interrupted from './Interrupted';
import WaitingForBuyer from './WaitingForBuyer';
import WaitingForDecision from './WaitingForDecision';
import WaitingOfAnnulment from './WaitingOfAnnulment';
import WaitingOfSigning from './WaitingOfSigning';
import WaitingOfSigningNotification from './WaitingOfSigningNotification';
import WaitingOfReceivingNotification from './WaitingOfReceivingNotification';
import WaitingOfReceivingConfirmation from './WaitingOfReceivingConfirmation';
import WaitingOfSellerTitleIzvpol from './WaitingOfSellerTitleIzvpol';
import Created from './Created';
import Rejected from './Rejected';
import SigningPdpolNotification from './SigningPdpolNotification';
import WaitingOfSigningDelivered from './WaitingOfSigningDelivered';
import WaitingOfAnnulmentDelivered from './WaitingOfAnnulmentDelivered';
import RoamingWaitingOfSigningDelivered from './RoamingWaitingOfSigningDelivered';
import WaitingOfNotificationDelivered from './WaitingOfNotificationDelivered';
import WaitingOfClarificationDelivered from './WaitingOfClarificationDelivered';
import WaitingOfPdpolSellerTitleIzvpol from './WaitingOfPdpolSellerTitleIzvpol';
import WaitingOfPdotprClarification from './WaitingOfPdotprClarification';
import WaitingOfPdpolClarification from './WaitingOfPdpolClarification';
import WaitingForPdotpr from './WaitingForPdotpr';
import WaitingForPdpol from './WaitingForPdpol';

const outStates: IState[] = [
  WaitingOfPdpolSellerTitleIzvpol,
  WaitingOfPdotprClarification,
  WaitingOfPdpolClarification,
  WaitingForPdotpr,
  WaitingForPdpol,
  Annulled,
  AnnulmentHasBeenRequested,
  Created,
  Complete,
  Declined,
  Rejected,
  Interrupted,
  WaitingForPdpol,
  WaitingForBuyer,
  WaitingOfAnnulment,
  WaitingForDecision,
  WaitingOfSigning,
  WaitingOfNotificationDelivered,
  WaitingOfClarificationDelivered,
  SigningPdpolNotification,
  WaitingOfSigningDelivered,
  WaitingOfSellerTitleIzvpol,
  WaitingOfAnnulmentDelivered,
  WaitingOfSigningNotification,
  WaitingOfReceivingNotification,
  WaitingOfReceivingConfirmation,
  RoamingWaitingOfSigningDelivered
];

export default outStates;
