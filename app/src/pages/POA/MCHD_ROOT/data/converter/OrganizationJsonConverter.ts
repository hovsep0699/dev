import {getKeyOrNull} from "../../utils/string_helper";
import {AddressJsonConverter} from "./AddressJsonConverter";
import {ContactsJsonConverter} from "./ContactsJsonConverter";
import {PowerDocumentJsonConverter} from "./PowerDocumentJsonConverter";

export class OrganizationJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            name: getKeyOrNull(fields["nameText"]),
            inn: getKeyOrNull(fields["inn"]),
            kpp: getKeyOrNull(fields["kpp"]),
            ogrn: getKeyOrNull(fields["ogrn"]),
            constituentDoc: getKeyOrNull(fields["constituentDoc"]),
            address: AddressJsonConverter.toFlatJson(fields),
            contacts: ContactsJsonConverter.toFlatJson(fields),
            powers: PowerDocumentJsonConverter.toFlatJson(fields),
        }
    }
}