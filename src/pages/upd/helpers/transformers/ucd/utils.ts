import { DTOUCDDocument } from './types';

export const getPurposeSchema = ({ formData, parameters }: DTOUCDDocument) => {
  let purpose;

  if (formData) {
    purpose = formData.purpose;
  } else {
    purpose = parameters.purpose;
  }

  switch (purpose) {
    case 'КСЧФ':
    case 'СЧФ':
      return {
        type: 'string',
        default: 'КСЧФ',
        enum: ['КСЧФ', 'КСЧФДИС'],
        enumNames: ['Корр. счет-фактура', 'Корр. счет-фактура и документ об изменении стоимости']
      };
    case 'ДИС':
    case 'ДОП':
      return {
        type: 'string',
        default: 'ДИС',
        enum: ['ДИС', 'КСЧФДИС'],
        enumNames: [
          'Документ об изменении стоимости',
          'Корр. счет-фактура и документ об изменении стоимости'
        ]
      };
    case 'СЧФДИС':
    case 'СЧФДОП':
      return {
        type: 'string',
        default: 'КСЧФ',
        enum: ['КСЧФ', 'КСЧФДИС', 'ДИС'],
        enumNames: [
          'Корр. счет-фактура',
          'Корр. счет-фактура и документ об изменении стоимости',
          'Документ об изменении стоимости'
        ]
      };
    default:
      return {
        type: 'string',
        enum: ['КСФ', 'КСФДИС','ДИС'],
        default: 'КСФДИС',
        enumNames: [
            'Корр. счет-фактура',
            'Корр. счет-фактура и документ об изменении стоимости',
            'Документ об изменении стоимости'
        ]
      };
  }
};
