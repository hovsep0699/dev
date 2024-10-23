import {SelectionType} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/SelectionType";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import {Representative} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Representative";
import {Info} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Info";
import {Powers} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Powers";

export class SectionPresenterViewModel {
    principals?: Principal[] | null;
    representatives?: Representative[] | null;
    retrustSelected?: SelectionType | null;
    selectedAttorneyType?: SelectionType | null;
    powerOfAttorney?: SelectionType | null;
    powersDelts?: SelectionType | null;
    powersSubTrust?: SelectionType | null;
    otherInformation?: string | null;
    textPowers?: string | null;
    info?: Info | null;
    powers?: Powers | null;
}