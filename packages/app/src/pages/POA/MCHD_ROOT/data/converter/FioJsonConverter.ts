import {getKeyOrNull} from "../../utils/string_helper";

export class FioJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        return {
            name: getKeyOrNull(fields["name"]),
            surname: getKeyOrNull(fields["name"]),
            patronymic: getKeyOrNull(fields["patronymic"]),
        }
    }
}