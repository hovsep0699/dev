import Environment from '../Environment';
import DiError, { AUTOCOMPLETE } from '../error/Error';
import createError from '../error/ErrorFactory';

class AutocompleteService {
  handleUserInput(DomainVO, callback, wrongValueMsg, notAccuratelyValueMsg, userInput) {
    return (data) => {
      const verifiedRows = userInput && data.rows.filter(item => item.title === userInput);
      const hasUniqueRow = data.rows.length === 1;
      const hasVerifiedUniqueRow = verifiedRows && (verifiedRows.length === 1);

      const isUserInputWrongValue = !data.rows.length;
      const isUserTypeValueNotAccurately = data.rows.length > 1;
      const isUserTypeValueAccurately = hasUniqueRow || hasVerifiedUniqueRow;

      if (isUserTypeValueAccurately) {
        const rowDataToProcess = hasVerifiedUniqueRow ? verifiedRows[0] : data.rows[0];

        if (callback) {
          return callback(rowDataToProcess);
        }
        return new DomainVO(rowDataToProcess);
      }

      let messageForDeveloper = 'Неизвестная ошибка. Дополните код AutocompleteService.';
      let messageForUser = '';
      if (isUserInputWrongValue) {
        messageForDeveloper = `${DomainVO.field} - Не найдено ни одного совпадения`;
        if (wrongValueMsg) messageForUser = wrongValueMsg;
      }
      if (isUserTypeValueNotAccurately) {
        messageForDeveloper = `${DomainVO.field} - Было найдено несколько совпадений. Пользователю необходимо уточнить запрос`;
        if (notAccuratelyValueMsg) messageForUser = notAccuratelyValueMsg;
      }
      if (messageForUser) {
        throw new DiError(AUTOCOMPLETE, messageForUser, messageForDeveloper);
      } else {
        throw createError(AUTOCOMPLETE, messageForDeveloper);
      }
    };
  }

  get currency() {
    return {
      field: 'title',
      request: (currencyTitle = '') => Environment.getAutocompleteGateway().getCurrencyByTitle(currencyTitle)
    };
  }

  get currencyByCode() {
    return {
      field: 'digital_code',
      request: (code = '') => Environment.getAutocompleteGateway().getCurrencyByCode(code)
    };
  }

  get measurement() {
    return {
      field: 'title',
      request: (measurementTitle = '') => Environment.getAutocompleteGateway().getMeasurementByTitle(measurementTitle)
    };
  }

  get measurementByCode() {
    return {
      field: 'code',
      request: (measurementCode = '') => Environment.getAutocompleteGateway().getMeasurementByCode(measurementCode)
    };
  }

  get country() {
    return {
      field: 'title',
      request: (countryTitle = '') => Environment.getAutocompleteGateway().getCountryByTitle(countryTitle)
    };
  }

  get recipient() {
    const params = {
      isActive: 1,
      type: 'division'
    };
    return {
      field: 'title',
      request: (companyInfo = '') => {
        params.all = companyInfo;
        return Environment.getAutocompleteGateway()
          .getRecipient(params);
      }
    };
  }

  get participant() {
    const params = {
      isActive: 1,
      type: 'division',
      limit: 12
    };
    return {
      field: 'name',
      request: () => Environment.getAutocompleteGateway().getParticipant(params)
    };
  }

  get region() {
    return {
      field: 'title',
      request: (regionStr = '') => Environment.getAddressGateway().getRegionByTitle(regionStr)
    };
  }

  get bank() {
    return {
      field: 'bik',
      request: (bik = '') => Environment.getBankGateway().getBankByBIK(bik)
    };
  }

  get ifns() {
    return {
      field: 'code',
      request: (code = '') => Environment.getIFNSGateway().getIFNSByCode(code)
    };
  }
}

const instance = new AutocompleteService();
export default instance;
