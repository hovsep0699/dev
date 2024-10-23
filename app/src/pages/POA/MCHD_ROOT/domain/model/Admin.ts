import autobind from "autobind-decorator";
import {SubAdmin} from "./SubAdmin";


export class Admin {
    private admins: SubAdmin[];
    private fields: {};

    constructor() {
        this.admins = [];
        this.fields = {};
    }

    @autobind
    public addAdmin(admin: any) {
        this.admins.push(admin);
    }

    @autobind
    public removeAdmin(index: number) {
        this.admins.splice(index, 1);
    }

    @autobind
    public getAdmins() {
        return this.admins;
    }

    @autobind
    public getAdmin(index: number) {
        return this.admins[index];
    }

    @autobind
    public editAdmin(index: number, admin: any) {
        if (index >= 0 && index < this.admins.length) {
            this.admins[index].setFields(admin);
        } else {
            console.log("Invalid index for editing admin");
            console.log(index);
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
    public toFlatJson(): Record<string, any> {
        return {}
    }
}
