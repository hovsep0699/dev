import autobind from "autobind-decorator";
import {
    PowersExercisedSelectionType, PowersExercisedType,
    PowersSelectionType,
    PowersSubTrustSelectionType, PowersSubTrustType,
} from "./SelectionType";
import {deepEqual} from "../../utils/json_hepler";
import {IModel} from "./IModel";

export interface PowersProps {
    type?: PowersSelectionType | null;
    // isGroupAllowed?: boolean | null;
    // isRevokeOnReDelegation?: boolean | null;
    textPowers?: string | null;
    exercised?: PowersExercisedSelectionType | null;
    reDelegatingAuthority?: PowersSubTrustSelectionType | null;
    structuredPowers?: string[] | null;
}

export class Powers implements IModel<Powers, PowersProps> {
    public type?: PowersSelectionType | null;
    // public isGroupAllowed: boolean;
    // public isRevokeOnReDelegation: boolean;
    public textPowers: string;
    public exercised?: PowersExercisedSelectionType | null;
    public reDelegatingAuthority: PowersSubTrustSelectionType | null;
    public structuredPowers: string[];

    public constructor(
        type?: PowersSelectionType | null,
        textPowers?: string | null,
        exercised?: PowersExercisedSelectionType | null,
        reDelegatingAuthority?: PowersSubTrustSelectionType | null,
        structuredPowers?: string[] | null,
    ) {
        this.type = type;
        this.textPowers = textPowers ?? "";
        this.exercised = exercised ?? null;
        this.reDelegatingAuthority = reDelegatingAuthority ?? null;
        this.structuredPowers = [
            'DIT_MP0001',
            'DIT_AS0001'
        ];
    }

    @autobind
    public copyWith({
                        type,
                        textPowers,
                        exercised,
                        reDelegatingAuthority,
                        structuredPowers

                    }: PowersProps
    ): Powers {
        return new Powers(
            type ?? this.type,
            textPowers ?? this.textPowers,
            exercised ?? this.exercised,
            reDelegatingAuthority ?? this.reDelegatingAuthority,
            structuredPowers ?? this.structuredPowers,
        )
    }

    @autobind
    public toFlatJson(): Record<string, any> {
        return {
            type: this.type?.value,
            isGroupAllowed: this.exercised?.value === PowersExercisedType.individual,
            isRevokeOnReDelegation: this.reDelegatingAuthority?.value === PowersSubTrustType.lost,
            textPowers: this.textPowers,
        }
    }

    @autobind
    public compare(powers: Powers): boolean {
        return this.type === powers.type &&
            this.textPowers === powers.textPowers &&
            this.exercised === powers.exercised &&
            this.reDelegatingAuthority === powers.reDelegatingAuthority &&
            this.structuredPowers === powers.structuredPowers;
    }
}