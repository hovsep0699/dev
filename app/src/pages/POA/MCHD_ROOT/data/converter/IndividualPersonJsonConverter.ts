import {getKeyOrNull} from "../../utils/string_helper";
import {PersonalDataJsonConverter} from "./PersonalDataJsonConverter";

export class IndividualPersonJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            name: getKeyOrNull(fields["nameText"]),
            ogrn: getKeyOrNull(fields["ogrn"]),
            inn: getKeyOrNull(fields["inn"]),
            socialNumber: getKeyOrNull(fields["socialNumber"]),
            personalData: PersonalDataJsonConverter.toFlatJson(fields),
        }
    }
}