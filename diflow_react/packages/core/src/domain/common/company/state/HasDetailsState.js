import CompanyState from '../CompanyState';

class HasDetailsState extends CompanyState {
  setAddress() {
    this._company.state = this._company.hasAddressAndDetailsState;
  }

  setDetails() {
    this._company.state = this._company.hasDetailsState;
  }
}

export default HasDetailsState;
