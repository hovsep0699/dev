import DiffCertificatesStrategy from './DiffCertificatesStrategy';
import Environment from '../../Environment';

export default class AJAXDiffCertificatesStrategy extends DiffCertificatesStrategy {
  diff(thumbprints) {
    return Environment.getAuthGateway().certificatesDiff(thumbprints)
      .then((response) => {
        const result = { thumbprints: [] };
        result.thumbprints = thumbprints.map((thumbprint) => {
          const isHasThumbprintInServerRes = response.thumbprints.some(value => value.thumbprint === thumbprint);
          const cert = response.thumbprints.find(value => value.thumbprint === thumbprint);
          return {
            thumbprint,
            is_active: cert ? cert.is_active : false,
            isHasThumbprintInServerRes,
          };
        });
        return result;
      });
  }
}
