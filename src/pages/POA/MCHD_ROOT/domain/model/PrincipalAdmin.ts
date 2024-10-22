import autobind from "autobind-decorator";
import {getKeyOrNull} from "../../utils/string_helper";
import {PersonalDataJsonConverter} from "../../data/converter/PersonalDataJsonConverter";
import {PowerDocumentJsonConverter} from "../../data/converter/PowerDocumentJsonConverter";
import {OrganizationJsonConverter} from "../../data/converter/OrganizationJsonConverter";
import {SubAdmin} from "./SubAdmin";
import {IModel} from "./IModel";
import {compareArrays, deepEqual} from "../../utils/json_hepler";

export interface PrincipalAdminProps {
    admins?: SubAdmin[] | null;
    fields?: any | null;
}

export class PrincipalAdmin implements IModel<PrincipalAdmin, PrincipalAdminProps> {
    private admins: SubAdmin[];
    private fields: any;

    constructor(admins?: SubAdmin[] | null, fields?: any | null) {
        this.fields = fields ?? {};
        this.admins = admins ?? new Array<SubAdmin>();
    }

    @autobind
    getFields() {
        return this.fields;
    }

    @autobind
    getAdmins(): SubAdmin[] {
        return this.admins;
    }

    @autobind
    changeAdmins(admins: SubAdmin[]) {
        this.admins = admins;
    }

    @autobind
    public removeAdmin(index: number) {
        this.admins.splice(index, 1);
    }

    @autobind
    public getAdmin(index: number): SubAdmin {
        return this.admins[index];
    }

    @autobind
    public addAdmin(admin: any) {
        this.admins.push(new SubAdmin(admin));
    }

    @autobind
    public editAdmin(index: number, admin: any) {
        if (index >= 0 && index < this.admins.length) {
            this.admins[index].setFields(admin);
        } else {
            new Error(`Invalid index for editing admin ${index}`);
        }
    }

    @autobind
    setFields(fields: any) {
        this.fields = fields;
    }

    @autobind
    copyWith({admins, fields}: PrincipalAdminProps) {
        return new PrincipalAdmin(admins ?? this.admins, fields ?? this.fields);
    }

    @autobind
    compare(other: PrincipalAdmin): boolean {
        return deepEqual(this.getFields(), other.getFields()) &&
            compareArrays<SubAdmin>(this.getAdmins(), other.getAdmins());
    }

    @autobind
    toFlatJson(): Record<string, any> {
        const fields: Record<string, any> = this.getFields();
        const currentType: string = fields["type"];

        switch (currentType) {
            case "ADMINIP":
                return {
                    individualEntrepreneur: {
                        name: getKeyOrNull(fields["nameText"]),
                        ogrn: getKeyOrNull(fields["ogrn"]),
                        inn: getKeyOrNull(fields["inn"]),
                        socialNumber: getKeyOrNull(fields["socialnumber"]),
                        personalData: PersonalDataJsonConverter.toFlatJson(fields),
                        powers: PowerDocumentJsonConverter.toFlatJson(fields),
                    }
                }
                // return {
                //     socialNumber: getKeyOrNull(fields["socialNumber"]),
                //     inn: getKeyOrNull(fields["inn"]),
                //     personalData: {
                //         fio: {
                //             name: getKeyOrNull(fields["fiasId"]),
                //             surname: getKeyOrNull(fields["surname"]),
                //             patronymic: getKeyOrNull(fields["patronymic"]),
                //         },
                //         gender: getKeyOrNull(fields["gender"]),
                //         citizenshipMark: getKeyOrNull(fields["citizenshipMark"]),
                //         ernNumber: getKeyOrNull(fields["ernNumber"]),
                //         birthday: getKeyOrNull(fields["birthday"]),
                //         birthPlace: getKeyOrNull(fields["birthPlace"]),
                //         citizenship: getKeyOrNull(fields["citizenship"]),
                //         address: {
                //             addressText: getKeyOrNull(fields["addressText"]),
                //             fiasText: getKeyOrNull(fields["fiasText"]),
                //             fiasId: getKeyOrNull(fields["fiasId"]),
                //             regionCode: getKeyOrNull(fields["regionCode"]),
                //         },
                //         contacts: {
                //             phone: getKeyOrNull(fields["phone"]),
                //             email: getKeyOrNull(fields["email"]),
                //         },
                //         identificationDocument: {
                //             kind: getKeyOrNull(fields["kind"]),
                //             serialNumber: getKeyOrNull(fields["serialNumber"]),
                //             issuedAt: getKeyOrNull(fields["issuedAt"]),
                //             issuer: getKeyOrNull(fields["issuer"]),
                //             issuerCode: getKeyOrNull(fields["issuerCode"]),
                //             expireAt: getKeyOrNull(fields["expireAt"]),
                //         }
                //     },
                //     powers: {
                //         name: getKeyOrNull(fields["documentName"]),
                //         issuedAt: getKeyOrNull(fields["issuedAtDocument"]),
                //         issuedBy: getKeyOrNull(fields["issuedBy"]),
                //         certification: getKeyOrNull(fields["certification"]),
                //     }
                // };
            case "ADMINUL":
                return {
                    russianOrg: {
                        org: OrganizationJsonConverter.toFlatJson(fields),
                    }
                }
            case "ADMINFL":
                return {}
            default:
                return {}
        }
    }
}
