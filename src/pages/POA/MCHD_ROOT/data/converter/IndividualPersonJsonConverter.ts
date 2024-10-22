import {getKeyOrNull} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/string_helper";
import {PersonalDataJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/PersonalDataJsonConverter";

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