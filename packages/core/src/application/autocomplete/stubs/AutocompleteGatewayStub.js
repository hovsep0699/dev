import AutocompleteGateway from '../AutocompleteGateway';
import currencyMock from '../../../mocks/autocomplete/autocomplete_currency_one';
import measurementMock from '../../../mocks/autocomplete/autocomplete_measurement_many';
import countryMock from '../../../mocks/autocomplete/autocomplete_country_many';
import recipientMock from '../../../mocks/autocomplete/autocomplete_recipient_one';
import participantMock from '../../../mocks/autocomplete/autocomplete_participant';

class AutocompleteGatewayStub extends AutocompleteGateway {
  getCurrencyByTitle() {
    return Promise.resolve(currencyMock);
  }

  getCurrencyByCode() {
    return Promise.resolve(currencyMock);
  }

  getMeasurementByTitle() {
    return Promise.resolve(measurementMock);
  }

  getCountryByTitle() {
    return Promise.resolve(countryMock);
  }

  getRecipient() {
    return Promise.resolve(recipientMock);
  }

  getParticipant() {
    return Promise.resolve(participantMock);
  }
}

export default AutocompleteGatewayStub;
