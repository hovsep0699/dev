import AJAX from '../../../infrastructure/AJAX';

class AddressGateway {
  getRegionByTitle(regionStr) {
    return AJAX.doGet('/front/region/', { title: regionStr });
  }
}

export default AddressGateway;
