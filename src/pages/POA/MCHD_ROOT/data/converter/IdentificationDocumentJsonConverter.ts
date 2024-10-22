import {getKeyOrNull} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/string_helper";

export class IdentificationDocumentJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            kind: getKeyOrNull(fields["kind"]),
            serialNumber: getKeyOrNull(fields["serialnumber"]),
            issuedAt: getKeyOrNull(fields["issuedAt"]),
            issuer: getKeyOrNull(fields["issuer"]),
            issuerCode: getKeyOrNull(fields["issuerCode"]),
            expireAt: getKeyOrNull(fields["expireAt"]),
        }
    }
}