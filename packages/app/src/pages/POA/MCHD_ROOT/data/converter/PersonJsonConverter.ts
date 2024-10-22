import {getKeyOrNull} from "../../utils/string_helper";
import {PersonalDataJsonConverter} from "./PersonalDataJsonConverter";
import {PowerDocumentJsonConverter} from "./PowerDocumentJsonConverter";

export class PersonJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            socialNumber: getKeyOrNull(fields["socialNumber"]),
            inn: getKeyOrNull(fields["inn"]),
            personalData: PersonalDataJsonConverter.toFlatJson(fields),
            powers: PowerDocumentJsonConverter.toFlatJson(fields),
            position: getKeyOrNull(fields["position"]),
        }
    }
}