import { assert } from 'chai';
import HasAddressState from './state/HasAddressState';
import HasDetailsState from './state/HasDetailsState';
import HasAddressAndDetailsState from './state/HasAddressAndDetailsState';
import NoAddressAndDetailsState from './state/NoAddressAndDetailsState';
import CompanyState from './CompanyState';

export default (company) => {
  company._hasDetailsState = new HasDetailsState(company);
  Object.defineProperty(company, 'hasDetailsState', {
    get: () => company._hasDetailsState
  });

  company._hasAddressState = new HasAddressState(company);
  Object.defineProperty(company, 'hasAddressState', {
    get: () => company._hasAddressState
  });

  company._hasAddressAndDetailsState = new HasAddressAndDetailsState(company);
  Object.defineProperty(company, 'hasAddressAndDetailsState', {
    get: () => company._hasAddressAndDetailsState
  });

  company._noAddressAndDetailsState = new NoAddressAndDetailsState(company);
  Object.defineProperty(company, 'noAddressAndDetailsState', {
    get: () => company._noAddressAndDetailsState
  });

  company._state = company.noAddressAndDetailsState;
  Object.defineProperty(company, 'state', {
    get: () => company._state,
    set: (value) => {
      assert.instanceOf(value, CompanyState);
      company._state = value;
      if (company.dispatch) {
        company.dispatch('state', company._state);
      }
    }
  });

  Object.defineProperty(company, 'isComplete', {
    get: () => company.state instanceof HasAddressAndDetailsState
  });

  return company;
};
