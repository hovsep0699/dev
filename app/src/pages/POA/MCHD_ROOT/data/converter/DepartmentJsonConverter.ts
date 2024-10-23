import {getKeyOrNull} from "../../utils/string_helper";
import {PersonalDataJsonConverter} from "./PersonalDataJsonConverter";
import {PowerDocumentJsonConverter} from "./PowerDocumentJsonConverter";
import {AddressJsonConverter} from "./AddressJsonConverter";
import {ContactsJsonConverter} from "./ContactsJsonConverter";

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