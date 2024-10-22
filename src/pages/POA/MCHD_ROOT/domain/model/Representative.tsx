import autobind from "autobind-decorator";
import {OrganizationJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/OrganizationJsonConverter";
import {ForeignOrganizationJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/ForeignOrganizationJsonConverter";
import {IndividualPersonJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/IndividualPersonJsonConverter";
import {DepartmentJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/DepartmentJsonConverter";
import {PersonJsonConverter} from "@distate/app/src/pages/POA/MCHD_ROOT/data/converter/PersonJsonConverter";
import {RepresentativeTypes} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/options/types";
import {deepEqual} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/json_hepler";
import {IModel} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/IModel";

export interface RepresentativeProps {
    fields?: any | null;
}

export class Representative implements IModel<Representative, RepresentativeProps>
{
    private fields : any;

    constructor(fields?: any | null) {
        this.fields = fields ?? {};
    }

    @autobind
    public setFields(fields: any) {
        this.fields = fields;
    }

    @autobind
    public getFields() {
        return this.fields;
    }

    @autobind
    public compare(other: Representative): boolean {
        return deepEqual(this.fields, other.fields);
    }

    @autobind
    public copyWith({fields}: RepresentativeProps): Representative {
        return new Representative(fields ?? this.fields);
    }

    @autobind
    public toFlatJson(): Record<string, any> {
        const fields: Record<string, any> = this.getFields();
        const currentType: string  = fields["type"];

        switch (currentType) {
            case RepresentativeTypes.IP:
                return {
                    individualEntrepreneur: IndividualPersonJsonConverter.toFlatJson(fields)
                }
            case RepresentativeTypes.FL:
                return {
                    person: PersonJsonConverter.toFlatJson(fields)
                }
            case RepresentativeTypes.UL:
                return {
                    russianOrg: OrganizationJsonConverter.toFlatJson(fields),
                }
            case RepresentativeTypes.FILUL:
                return {
                    department: DepartmentJsonConverter.toFlatJson(fields),
                }
            case RepresentativeTypes.FILINUL:
                return {
                    foreignOrg: ForeignOrganizationJsonConverter.toFlatJson(fields),
                }
            default: {

            }
        }
        return {}
    }

}