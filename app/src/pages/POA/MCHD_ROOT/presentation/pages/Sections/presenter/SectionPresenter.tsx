import {Presenter} from "../../../presenter/presenter";
import {SelectionType} from "../../../../domain/model/SelectionType";
import {SectionPresenterState} from "./SectionPresenterState";
import {Representative} from "../../../../domain/model/Representative";
import {PrincipalManager} from "../../../../core/PrincipalManager";
import {RepresentativeManager} from "../../../../core/RepresentativeManager";
import {Principal} from "../../../../domain/model/Principal";
import autobind from "autobind-decorator";
import {Info} from "../../../../domain/model/Info";
import {Powers} from "../../../../domain/model/Powers";
import {SectionPresenterViewModel} from "./SectionPresenterViewModel";

export class SectionPresenter extends Presenter<SectionPresenterViewModel, SectionPresenterState> {
    private principalManager: PrincipalManager;
    private representativeManager: RepresentativeManager;

    constructor(principalManager: PrincipalManager, representativeManager: RepresentativeManager) {
        super(new SectionPresenterState({
            principals: principalManager.getPrincipals(),
            representatives: representativeManager.getRepresentatives()
        }));
        this.principalManager = principalManager;
        this.representativeManager = representativeManager;

    }

    @autobind
    public  onAttorneyTypeChange(selectedAttorneyType?: SelectionType): void {
        this.setState(this.state.copyWith({selectedAttorneyType: selectedAttorneyType}));
    }

    @autobind
    public onInfoChanged(info?: Info | null): void {
        this.setState(this.state.copyWith({info: info}));
    }

    // @autobind
    // public onTaxChange(taxes?: Tax[]): void {
    //     this.setState(this.state.copyWith({taxes: taxes}));
    // }


    @autobind
    public onRetrustSelectionChanaged(retrustSelected?: SelectionType): void {
        this.setState(this.state.copyWith({retrustSelected: retrustSelected}));
    }

    @autobind
    public onPrincipalsChange(principals: Principal[]): void {
        this.setState(this.state.copyWith({principals: principals}));
    }

    @autobind
    public onRepresentativesChange(representatives: Representative[]): void {
        this.setState(this.state.copyWith({representatives: representatives}));
    }

    @autobind
    public onPowersChange(powers: Powers): void {
        this.setState(this.state.copyWith({powers: powers}));
    }

    @autobind
    public onPowerOfAttorneyChanged(powerOfAttorney: SelectionType): void {
        this.setState(this.state.copyWith({powerOfAttorney: powerOfAttorney}));
    }

    @autobind
    public onPowersDeltsChanged(powerOfDelts: SelectionType): void {
        this.setState(this.state.copyWith({powersDelts: powerOfDelts}));
    }

    @autobind
    public onPowersSubTrustChanged(powersSubTrust: SelectionType): void {
        this.setState(this.state.copyWith({powersSubTrust: powersSubTrust}));
    }

    @autobind
    public onOtherInformationChanged(otherInformation: string): void {
        this.setState(this.state.copyWith({otherInformation: otherInformation}));
    }

    @autobind
    public onTextPowersChanged(textPowers: string): void {
        this.setState(this.state.copyWith({textPowers: textPowers}));
    }

    @autobind
    public update() {
        this.setState(this.state.copyWith({
            principals: this.principalManager.getPrincipals(),
            representatives: this.representativeManager.getRepresentatives()
        }));
    }
}

