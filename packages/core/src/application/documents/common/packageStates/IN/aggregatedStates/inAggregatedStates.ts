import { IAggregatedState } from '../../types';
import Annulled from './Annulled';
import AnnulmentHasBeenRequested from './AnnulmentHasBeenRequested';
import Complete from './Complete';
import Declined from './Declined';
import Interrupted from './Interrupted';
import ReceiptSignRequired from './ReceiptSignRequired';
import SignRequired from './SignRequired';
import WaitingForDecision from './WaitingForDecision';
import WaitingOfAnnulment from './WaitingOfAnnulment';
import Processing from './Processing';
import Received from './Received';
import Rejected from './Rejected';
import WaitingOfSigning from './WaitingOfSigning';
import WaitingOfSigningIzvpolPdotprSellerTitleIzvpol from './WaitingOfSigningIzvpolPdotprSellerTitleIzvpol';
import WaitingOfSigningDelivered from './WaitingOfSigningDelivered';
import WaitingOfSecondSignatureDelivered from './WaitingOfSecondSignatureDelivered';
import WaitingOfPdotprSellerTitleIzvpol from './WaitingOfPdotprSellerTitleIzvpol';
import WaitingOfNotificationDelivered from './WaitingOfNotificationDelivered';
import WaitingOfClarificationDelivered from './WaitingOfClarificationDelivered';

const inAggregatedStates: IAggregatedState[] = [
  Received,
  Rejected,
  Annulled,
  AnnulmentHasBeenRequested,
  Complete,
  Declined,
  Interrupted,
  ReceiptSignRequired,
  SignRequired,
  WaitingForDecision,
  WaitingOfAnnulment,
  Processing,
  WaitingOfSigning,
  WaitingOfSigningDelivered,
  WaitingOfNotificationDelivered,
  WaitingOfClarificationDelivered,
  WaitingOfPdotprSellerTitleIzvpol,
  WaitingOfSecondSignatureDelivered,
  WaitingOfSigningIzvpolPdotprSellerTitleIzvpol
];

export default inAggregatedStates;
