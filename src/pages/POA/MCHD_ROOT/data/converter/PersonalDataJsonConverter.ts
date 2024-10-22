import {getKeyOrNull} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/string_helper";
import {FioJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/FioJsonConverter";
import {AddressJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/AddressJsonConverter";
import {ContactsJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/ContactsJsonConverter";
import {IdentificationDocumentJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/IdentificationDocumentJsonConverter";

export class PersonalDataJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            fio: FioJsonConverter.toFlatJson(fields),
            gender: getKeyOrNull(fields["gender"]),
            citizenshipMark: getKeyOrNull(fields["citizenshipMark"]),
            ernNumber: getKeyOrNull(fields["ernNumber"]),
            birthday: getKeyOrNull(fields["birthday"]),
            birthPlace: getKeyOrNull(fields["birthPlace"]),
            citizenship: getKeyOrNull(fields["citizenship"]),
            address: AddressJsonConverter.toFlatJson(fields),
            contacts: ContactsJsonConverter.toFlatJson(fields),
            identificationDocument: IdentificationDocumentJsonConverter.toFlatJson(fields),
        }
    }
}