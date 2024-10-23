import {getKeyOrNull} from "../../utils/string_helper";
import {FioJsonConverter} from "./FioJsonConverter";
import {AddressJsonConverter} from "./AddressJsonConverter";
import {ContactsJsonConverter} from "./ContactsJsonConverter";
import {IdentificationDocumentJsonConverter} from "./IdentificationDocumentJsonConverter";

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