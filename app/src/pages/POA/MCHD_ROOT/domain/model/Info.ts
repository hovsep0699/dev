import {Tax} from "./Tax";
import autobind from "autobind-decorator";
import {formatDateToDDMMYYYY} from "../../utils/date_helper";
import {IModel} from "./IModel";



export interface InfoProps {
    internalNumber?: string | null,
    issuedAt?: Date | null | undefined,
    expireAt?: Date | null | undefined,
    additionalNumber?: string | null,
    reAssignable?: string | null,
    validForTaxAuthorities?: Tax[] | null,
    taxAuthority?: string | null,
    otherInformation?: string | null
}

export class Info implements IModel<Info, InfoProps> {
    public internalNumber: string;
    public issuedAt?: Date | null | undefined;
    public expireAt?: Date | null | undefined;
    public additionalNumber: string;
    public reAssignable: string;
    public validForTaxAuthorities: Tax[];
    public taxAuthority: string;
    public otherInformation: string;

    public constructor(
        internalNumber?: string | null,
        issuedAt?: Date | null | undefined,
        expireAt?: Date | null | undefined,
        additionalNumber?: string | null,
        reAssignable?: string | null,
        validForTaxAuthorities?: Tax[] | null,
        taxAuthority?: string | null,
        otherInformation?: string | null
    ) {
        this.internalNumber = internalNumber ?? "";
        this.issuedAt = issuedAt ?? null;
        this.expireAt = expireAt ?? null;
        this.reAssignable = reAssignable ?? "none";
        this.validForTaxAuthorities = validForTaxAuthorities ?? [new Tax()];
        this.taxAuthority = taxAuthority ?? "";
        this.additionalNumber = additionalNumber ?? "";
        this.otherInformation = otherInformation ?? "";
    }

    @autobind
    public copyWith({
                        internalNumber,
                        issuedAt,
                        expireAt,
                        additionalNumber,
                        reAssignable,
                        validForTaxAuthorities,
                        taxAuthority,
                            otherInformation
                    }: InfoProps
    ): Info {
        return new Info(
            internalNumber ?? this.internalNumber,
            issuedAt ?? this.issuedAt,
            expireAt ?? this.expireAt,
            additionalNumber ?? this.additionalNumber,
            reAssignable ?? this.reAssignable,
            validForTaxAuthorities ?? this.validForTaxAuthorities ?? [],
            taxAuthority ?? this.taxAuthority,
            otherInformation ?? this.otherInformation
        )
    }

    @autobind
    public toFlatJson(): Record<string, any> {
        return {
            internalNumber: this.internalNumber,
            issuedAt: formatDateToDDMMYYYY(this.issuedAt),
            expireAt: formatDateToDDMMYYYY(this.expireAt),
            additionalNumber: this.additionalNumber,
            reAssignable: this.reAssignable,
            // validForTaxAuthorities: this.validForTaxAuthorities,
            // taxAuthority: this.taxAuthority,
            // otherInformation: this.otherInformation,
        }
    }

    @autobind
    public compare(info: Info): boolean {
        return this.internalNumber === info.internalNumber &&
            this.expireAt === info.expireAt &&
            this.issuedAt === info.issuedAt &&
            this.additionalNumber === info.additionalNumber &&
            this.reAssignable === info.reAssignable &&
            this.validForTaxAuthorities === info.validForTaxAuthorities &&
            this.taxAuthority === info.taxAuthority &&
            this.otherInformation === info.otherInformation;
    }
}