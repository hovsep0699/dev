import {getKeyOrNull} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/string_helper";
import {PersonalDataJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/PersonalDataJsonConverter";
import {PowerDocumentJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/PowerDocumentJsonConverter";

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