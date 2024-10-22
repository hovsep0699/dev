export default class DiffCertificatesStrategy {
    diff(thumbprints) {
        throw new Error('Invoke this method in subclass');
    }
}
