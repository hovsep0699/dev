export enum PowersType {
    text = "text",
    machineReadable = "machineReadable",
}

export enum PowersExercisedType {
    individual = 1,
    group
}
export enum PowersSubTrustType {
    lost = 1,
    notLost
}

export class GeneralSelectionType<T> {
    public label: string;
    public value: T | string;

    constructor(value?: T | string | null, label?: string) {
        this.label = label ?? "";
        this.value = value ?? "";
    }
}
export class SelectionType extends GeneralSelectionType<string> {}

export class PowersSelectionType extends GeneralSelectionType<PowersType> {}

export class PowersExercisedSelectionType extends GeneralSelectionType<PowersExercisedType> {}

export class PowersSubTrustSelectionType extends GeneralSelectionType<PowersSubTrustType> {}