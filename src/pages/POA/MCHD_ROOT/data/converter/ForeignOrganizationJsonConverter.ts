import {getKeyOrNull} from "../../utils/string_helper";
import {AddressJsonConverter} from "./AddressJsonConverter";
import {ContactsJsonConverter} from "./ContactsJsonConverter";

export class ForeignOrganizationJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            name: getKeyOrNull(fields["nameText"]),
            inn: getKeyOrNull(fields["inn"]),
            kpp: getKeyOrNull(fields["kpp"]),
            accreditation: getKeyOrNull(fields["accreditation"]),
            country: getKeyOrNull(fields["country"]),
            regAuthorityName: getKeyOrNull(fields["regAuthorityName"]),
            number: getKeyOrNull(fields["number"]),
            code: getKeyOrNull(fields["code"]),
            contacts: ContactsJsonConverter.toFlatJson(fields),
            address: getKeyOrNull(fields["homeAddress"]),
            russianAddress: AddressJsonConverter.toFlatJson(fields),
        }
    }
}