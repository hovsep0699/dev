import { IState } from '../../types';
import Annulled from './Annulled';
import Complete from './Complete';
import Declined from './Declined';
import Received from './Received';
import Rejected from './Rejected';
import Interrupted from './Interrupted';
import WaitingForBuyer from './WaitingForBuyer';
import WaitingOfSigning from './WaitingOfSigning';
import WaitingForDecision from './WaitingForDecision';
import WaitingOfAnnulment from './WaitingOfAnnulment';
import AnnulmentHasBeenRequested from './AnnulmentHasBeenRequested';
import WaitingOfClarificationSigning from './WaitingOfClarificationSigning';
import WaitingOfReceiverTitleSigning from './WaitingOfReceiverTitleSigning';
import WaitingOfSignatureRejectionSigning from './WaitingOfSignatureRejectionSigning';
import WaitingOfSigningNotification from './WaitingOfSigningNotification';
import WaitingOfClarificationDelivered from './WaitingOfClarificationDelivered';
import WaitingOfNotificationDelivered from './WaitingOfNotificationDelivered';
import WaitingOfPdotprSellerTitleIzvpol from './WaitingOfPdotprSellerTitleIzvpol';
import WaitingOfSecondSignatureDelivered from './WaitingOfSecondSignatureDelivered';
import WaitingOfSigningDelivered from './WaitingOfSigningDelivered';
import WaitingOfSigningIzvpolPdotprSellerTitleIzvpol from './WaitingOfSigningIzvpolPdotprSellerTitleIzvpol';
import WaitingOfPdpolSellerTitleIzvpol from './WaitingOfPdpolSellerTitleIzvpol';
import WaitingOfPdotprClarification from './WaitingOfPdotprClarification';
import WaitingOfPdpolClarification from './WaitingOfPdpolClarification';
import WaitingForPdotpr from './WaitingForPdotpr';
import WaitingForPdpol from './WaitingForPdpol';

const inStates: IState[] = [
  WaitingOfPdpolSellerTitleIzvpol,
  WaitingOfPdotprClarification,
  WaitingOfPdpolClarification,
  WaitingForPdotpr,
  WaitingForPdpol,
  Received,
  Rejected,
  Annulled,
  AnnulmentHasBeenRequested,
  Complete,
  Declined,
  Interrupted,
  WaitingForBuyer,
  WaitingForDecision,
  WaitingOfAnnulment,
  WaitingOfClarificationSigning,
  WaitingOfClarificationDelivered,
  WaitingOfReceiverTitleSigning,
  WaitingOfSignatureRejectionSigning,
  WaitingOfSigning,
  WaitingOfSigningDelivered,
  WaitingOfSigningNotification,
  WaitingOfNotificationDelivered,
  WaitingOfPdotprSellerTitleIzvpol,
  WaitingOfSecondSignatureDelivered,
  WaitingOfSigningIzvpolPdotprSellerTitleIzvpol
];

export default inStates;
