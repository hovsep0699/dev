/**
 * waitingSigningNotification - Требуется подписать квитанции
 * waitingBuyer - Требуется подпись
 * annulmentRequested - Требуется аннулирование
 * waitingSigning - Ожидается подпись
 * waitingAnnulment - Ожидается аннулирование
 * waitingNotification - Ожидается извещение о получении
 * complete - Документооборот завершен
 * declined - Документооборот отклонен
 * interrupted - Возникла ошибка
 * annulled - Аннулирован
 * processing - В обработке
 **/

const statusEnum = {
  waitingSigningNotification: 'Требуется подписать квитанции',
  waitingBuyer: 'Требуется подпись',
  annulmentRequested: 'Требуется аннулирование',
  waitingSigning: 'Ожидается подпись',
  waitingAnnulment: 'Ожидается аннулирование',
  waitingNotification: 'Ожидается извещение о получении',
  complete: 'Документооборот завершен',
  declined: 'Документооборот отклонен',
  interrupted: 'Возникла ошибка',
  annulled: 'Аннулирован',
  processing: 'В обработке',
  waitingEDO: 'Ожидание подтверждения оператора ЭДО'
};

const statusInboxHid = {
  waitingSigning: true,
  waitingNotification: true
};

const statusOutboxHid = {
  waitingBuyer: true
};

const status = Object.keys(statusEnum);

export const getStatus = (mode?: string) => {
  return status.reduce<{ enum: string[]; enumNames: string[] }>(
    (prev, key) => {
      if (mode === 'inbox' && statusInboxHid.hasOwnProperty(key)) {
        return prev;
      }

      if (mode === 'outbox' && statusOutboxHid.hasOwnProperty(key)) {
        return prev;
      }

      // @ts-ignore
      prev.enumNames.push(statusEnum[key]);
      prev.enum.push(key);

      return prev;
    },
    { enum: [], enumNames: [] }
  );
};

export default {
  code: 'packageStates',
  inbox: {
    waitingEDO: [
      'waiting_for_pdotpr',
      'waiting_of_pdpol_seller_title_izvpol',
      'waiting_of_pdpol_clarification',
      'waiting_for_pdpol',
      'waiting_of_pdotpr_clarification'
    ],
    waitingSigningNotification: [
      'waiting_of_receiver_title_signing',
      'waiting_of_signing',
      'waiting_of_clarification_signing',
      'waiting_of_signature_rejection_signing',
      'waiting_of_signing_izvpol_pdotpr_seller_title_izvpol'
    ],
    waitingBuyer: ['waiting_for_decision'],
    annulmentRequested: ['annulment_has_been_requested'],
    waitingAnnulment: ['waiting_of_annulment'],
    complete: ['complete'],
    declined: ['declined'],
    interrupted: ['interrupted'],
    annulled: ['annulled'],
    processing: {
      code: 'notPackageStates',
      status: [
        'annulled',
        'interrupted',
        'declined',
        'complete',
        'waiting_of_annulment',
        'waiting_of_signing',
        'waiting_for_decision',
        'waiting_of_receiver_title_signing',
        'waiting_of_clarification_signing',
        'waiting_of_signature_rejection_signing',
        'waiting_of_signing_izvpol_pdotpr_seller_title_izvpol',
        'annulment_has_been_requested'
      ]
    }
  },
  outbox: {
    waitingEDO: [
      'waiting_for_pdotpr',
      'waiting_of_pdpol_seller_title_izvpol',
      'waiting_of_pdpol_clarification',
      'waiting_for_pdpol',
      'waiting_of_pdotpr_clarification'
    ],
    waitingSigningNotification: ['waiting_of_signing', 'signing_pdpol_notification'],
    annulmentRequested: ['annulment_has_been_requested'],
    waitingSigning: ['waiting_for_decision'],
    waitingAnnulment: ['waiting_of_annulment'],
    waitingNotification: [
      'waiting_of_receiving_notification',
      'waiting_of_receiving_confirmation',
      'waiting_of_seller_title_izvpol'
    ],
    complete: ['complete'],
    declined: ['declined'],
    interrupted: ['interrupted'],
    annulled: ['annulled'],
    processing: {
      code: 'notPackageStates',
      status: [
        'annulled',
        'interrupted',
        'declined',
        'complete',
        'waiting_of_annulment',
        'waiting_of_signing',
        'signing_pdpol_notification',
        'annulment_has_been_requested',
        'waiting_for_decision'
      ]
    }
  }
};
