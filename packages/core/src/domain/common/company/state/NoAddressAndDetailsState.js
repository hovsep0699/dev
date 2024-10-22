import CompanyState from '../CompanyState';

class NoAddressAndDetailsState extends CompanyState {
  setAddress() {
    this._company.state = this._company.hasAddressState;
  }

  setDetails() {
    this._company.state = this._company.hasDetailsState;
  }
}

export default NoAddressAndDetailsState;
