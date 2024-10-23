import {getKeyOrNull} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/string_helper";
import {PowerDocumentJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/PowerDocumentJsonConverter";
import {AddressJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/AddressJsonConverter";
import {ContactsJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/ContactsJsonConverter";

export class DepartmentJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            name: getKeyOrNull(fields["nameText"]),
            kpp: getKeyOrNull(fields["kpp"]),
            ogrn: getKeyOrNull(fields["ogrn"]),
            constituentDoc: getKeyOrNull(fields["constituentDoc"]),
            address: AddressJsonConverter.toFlatJson(fields),
            contacts: ContactsJsonConverter.toFlatJson(fields),
            powers: PowerDocumentJsonConverter.toFlatJson(fields),
            regNumber: getKeyOrNull(fields["regNumber"]),
        }
    }
}