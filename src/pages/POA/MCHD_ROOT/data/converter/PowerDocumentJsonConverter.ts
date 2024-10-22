import {getKeyOrNull} from "../../utils/string_helper";

export class PowerDocumentJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            name: getKeyOrNull(fields["documentName"]),
            issuedAt: getKeyOrNull(fields["issuedAtDocument"]),
            issuedBy: getKeyOrNull(fields["issuedByDocument"]),
            certification: getKeyOrNull(fields["certification"]),
        }
    }
}