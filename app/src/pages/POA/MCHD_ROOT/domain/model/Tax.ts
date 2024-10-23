import {IModel} from "./IModel";
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
    public copyWith({
        id,
        value
    }: TaxProps): Tax {
        return new Tax(id ?? this.id, value ?? this.value);
    }

    @autobind
    public compare(other: Tax): boolean {
        return this.id === other.id && this.value === other.value;
    }

    @autobind
    public toFlatJson(): Record<string, any> {
        return {
            taxValue: this.value,
        }
    }
}