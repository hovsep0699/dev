import {getKeyOrNull} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/string_helper";
import {AddressJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/AddressJsonConverter";
import {ContactsJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/ContactsJsonConverter";
import {PowerDocumentJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/PowerDocumentJsonConverter";

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