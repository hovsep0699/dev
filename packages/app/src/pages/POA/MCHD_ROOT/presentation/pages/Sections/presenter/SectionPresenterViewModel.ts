import {SelectionType} from "../../../../domain/model/SelectionType";
import {Principal} from "../../../../domain/model/Principal";
import {Representative} from "../../../../domain/model/Representative";
import {Info} from "../../../../domain/model/Info";
import {Powers} from "../../../../domain/model/Powers";

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