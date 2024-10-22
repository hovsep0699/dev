import CompanyState from '../CompanyState';

class HasAddressState extends CompanyState {
  setDetails() {
    this._company.state = this._company.hasAddressAndDetailsState;
  }

  setAddress() {
    this._company.state = this._company.hasAddressState;
  }
}


export default HasAddressState;
