import SignService from '@distate/core/dist/application/sign/SignService';

class SingApi {
  async getList() {
    return SignService.getReceiptsForSigningList();
  }
}

const SingApiServices = new SingApi();
export { SingApiServices };
