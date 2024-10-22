import autobind from "autobind-decorator";
import {IModel} from "./IModel";
import {deepEqual} from "../../utils/json_hepler";

export interface SubAdminProps {
    fields?: any | null;
}

export class SubAdmin implements IModel<SubAdmin, SubAdminProps>{
    private fields: any;

    constructor(fields?: any | null) {
        this.fields = fields ?? {};
    }

    @autobind
    copyWith({fields}: SubAdminProps): SubAdmin {
        return new SubAdmin(fields ?? this.fields);
    }

    @autobind
    compare(other: SubAdmin): boolean {
        return deepEqual(this.getFields(), other.getFields());
    }

    @autobind
    public setFields(fields: any) {
        this.fields = fields;
    }

    @autobind
    public getFields(): Record<string, any> {
        return this.fields;
    }


    @autobind
    toFlatJson(): Record<string, any> {
        return {}
    }
}
