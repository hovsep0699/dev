import {getKeyOrNull} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/string_helper";

export class ContactsJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            phone: getKeyOrNull(fields.phone),
            email: getKeyOrNull(fields.email),
        }
    }
}