import {IModel} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/IModel";
import autobind from "autobind-decorator";

export interface TaxProps {
    id?: string | null;
    value?: string | null;
}

export class Tax implements IModel<Tax, TaxProps> {
    id: string;
    value: string;

    constructor(id?: string, value?: string) {
        this.id = id ?? "0";
        this.value = value ?? "";
    }

    @autobind
    copyWith({
        id,
        value
    }: TaxProps): Tax {
        return new Tax(id ?? this.id, value ?? this.value);
    }

    @autobind
    compare(other: Tax): boolean {
        return this.id === other.id && this.value === other.value;
    }

    @autobind
    toFlatJson(): Record<string, any> {
        return {
            taxValue: this.value,
        }
    }
}