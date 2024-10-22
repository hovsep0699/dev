import {getKeyOrNull, joinStrings} from "../../utils/string_helper";

export class AddressJsonConverter {
    public static toFlatJson(fields: Record<string, any>): Record<string, any> {
        const finalAddress = joinStrings(
            fields["Index"],
            fields["Province"],
            fields["city"],
            fields["settlement"],
            fields["street"],
            fields["house"],
            fields["block"],
            fields["flat"],
        );
        return {
            addressText: getKeyOrNull(finalAddress),
            fiasText: getKeyOrNull(fields["fiasText"]),
            fiasId: getKeyOrNull(fields["fiasId"]),
            regionCode: getKeyOrNull(fields["regionCode"]),
        }
    }
}