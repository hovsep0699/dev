import autobind from "autobind-decorator";
import {PrincipalEntity} from "../entity/PrincipalEntity";
import {PrincipalAdmin} from "./PrincipalAdmin";
import {ForeignOrganizationJsonConverter} from "../../data/converter/ForeignOrganizationJsonConverter";
import {OrganizationJsonConverter} from "../../data/converter/OrganizationJsonConverter";
import {IndividualPersonJsonConverter} from "../../data/converter/IndividualPersonJsonConverter";
import {PrincipalTypes} from "../../presentation/constants/options/types";
import {compareArrays, deepEqual} from "../../utils/json_hepler";
import {IModel} from "./IModel";

export interface PrincipalProps {
    admins?: PrincipalAdmin[] | null
    fields?: any | null
}


export class Principal implements IModel<Principal, PrincipalProps>{
    private admins: PrincipalAdmin[];
    private fields: any;

    constructor(admins?: PrincipalAdmin[] | null, fields?: any | null) {
        this.admins = admins ?? new Array<PrincipalAdmin>();
        this.fields = fields ?? {};
    }

    @autobind
    copyWith({admins, fields}: PrincipalProps): Principal {
        return new Principal(admins ?? this.admins, fields ?? this.fields);
    }

    @autobind
    public addAdmin(admin: any) {
        this.admins.push(new PrincipalAdmin(admin));
    }

    @autobind
    public removeAdmin(index: number) {
        this.admins.splice(index, 1);
    }

    @autobind
    public getAdmins(): PrincipalAdmin[] {
        return this.admins;
    }

    @autobind
    public getAdmin(index: number): PrincipalAdmin {
        return this.admins[index];
    }

    @autobind
    public changeAdmin(index: number, admin: PrincipalAdmin) {
        if (index >= 0 && index < this.admins.length) {
            this.admins[index] = admin;
        }
        else {
            throw new Error(`Invalid index for editing admin ${index}`);
        }
    }

    @autobind
    public editAdmin(index: number, admin: any) {
        if (index >= 0 && index < this.admins.length) {
            this.admins[index].setFields(admin);
        } else {
            throw new Error(`Invalid index for editing admin ${index}`);
        }
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
    public toEntity(): Record<string, any> | null {
        return new PrincipalEntity(this);
    }

    @autobind
    public compare(other: Principal): boolean {
        return compareArrays<PrincipalAdmin>(this.getAdmins(), other.getAdmins()) && deepEqual(this.getFields(), other.getFields());
    }

    @autobind
    toFlatJson(): Record<string, any> {
        const fields: Record<string, any> = this.getFields();
        const currentType: string = fields["type"];

        const directors: Record<string, any>[] = this.admins.map((admin: PrincipalAdmin) => admin.toFlatJson());

        switch (currentType) {
            case PrincipalTypes.IP:
                return {
                    individualEntrepreneur: IndividualPersonJsonConverter.toFlatJson(fields)
                }
            case PrincipalTypes.INUL:
                return {
                    foreignOrg: {
                        organization: ForeignOrganizationJsonConverter.toFlatJson(fields),
                        directors: directors
                    }
                }
            case PrincipalTypes.UL:
                return {
                    russianOrg: {
                        organization: OrganizationJsonConverter.toFlatJson(fields),
                        directors: directors
                    }
                }
            default:
                return {}

        }
    }
}
