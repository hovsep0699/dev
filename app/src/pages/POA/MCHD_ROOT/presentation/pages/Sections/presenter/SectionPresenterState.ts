import {SectionPresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterViewModel";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import {Representative} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Representative";
import autobind from "autobind-decorator";
import {Info} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Info";
import {Powers} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Powers";
import {SelectionType} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/SelectionType";
import {compareArrays} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/json_hepler";
import {state} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/presenter/BasicState";

export class SectionPresenterState implements state<SectionPresenterState, SectionPresenterViewModel>{
    public principals: Principal[];
    public representatives: Representative[];
    public info: Info;
    public powers: Powers;
    public retrustSelected: SelectionType;
    public selectedAttorneyType: SelectionType;
    public otherInformation: string;
    public textPowers: string;

    constructor({
                    principals,
                    representatives,
                    retrustSelected,
                    selectedAttorneyType,
                    otherInformation,
                    textPowers,
                    info,
                    powers
                }: SectionPresenterViewModel) {
        this.principals = principals ?? [];
        this.representatives = representatives ?? [];
        this.otherInformation = otherInformation ?? "";
        this.textPowers = textPowers ?? "";
        this.retrustSelected = retrustSelected ?? new SelectionType();
        this.selectedAttorneyType = selectedAttorneyType ?? new SelectionType();
        this.info = info ?? new Info()
        this.powers = powers ?? new Powers()
    }

    @autobind
    initial(): SectionPresenterState {
        return new SectionPresenterState(
            {
                principals: [],
                representatives: [],
                otherInformation: "",
                textPowers: "",
                retrustSelected: new SelectionType(),
                selectedAttorneyType: new SelectionType(),
                info: new Info(),
                powers: new Powers()
            }
        )
    }

    @autobind
    compare(other: SectionPresenterState): boolean {
        return compareArrays<Principal>(this.principals, other.principals) &&
            compareArrays<Representative>(this.representatives, other.representatives) &&
            this.info.compare(other.info) &&
            this.powers.compare(other.powers) &&
            this.retrustSelected === other.retrustSelected &&
            this.selectedAttorneyType === other.selectedAttorneyType &&
            this.otherInformation === other.otherInformation &&
            this.textPowers === other.textPowers;

    }

    @autobind
    copyWith({
                 principals,
                 representatives,
                 retrustSelected,
                 selectedAttorneyType,
                 otherInformation,
                 textPowers,
                 info,
                 powers
             }: SectionPresenterViewModel ): SectionPresenterState {
        return new SectionPresenterState({
            principals: principals ?? this.principals,
            representatives: representatives ?? this.representatives,
            otherInformation: otherInformation ?? "",
            retrustSelected: retrustSelected ?? this.retrustSelected,
            selectedAttorneyType: selectedAttorneyType ?? this.selectedAttorneyType,
            textPowers: textPowers ?? this.textPowers,
            info: info ?? this.info,
            powers: powers ?? this.powers
        }) as SectionPresenterState;
    }

    @autobind
    toFlatJson(){
        return {
            force: true,
            principals: this.principals,
            representatives: this.representatives,
            // taxes: this.taxes,
            selectedRetrust: this.retrustSelected,
            selectedAttorneyType: this.selectedAttorneyType
        }
    }
}