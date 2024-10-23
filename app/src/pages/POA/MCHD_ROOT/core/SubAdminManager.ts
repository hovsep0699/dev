import autobind from "autobind-decorator";
import {SubAdmin} from "../domain/model/SubAdmin";


export  class SubAdminManager {
    private admins: SubAdmin[];
    constructor() {
        this.admins = [];
    }

    @autobind
    public resetAdmins() {
        this.admins = new Array<SubAdmin>();
    }
    @autobind
    public addAdmin(fields: any) {
        const admin: SubAdmin = new SubAdmin();
        admin.setFields(fields);
        this.admins.push(admin);
    }

    @autobind
    public removeAdmin(index: number) {
        this.admins.splice(index, 1);
    }

    @autobind
    public getAdmins(): SubAdmin[] {
        console.log("testttttt");
        console.log(this.admins);

        return this.admins;
    }

    @autobind
    public getAdmin(index: number): SubAdmin {
        console.log("testttttt");
        console.log(this.admins[index]);

        return this.admins[index];
    }

    @autobind
    public editAdmin(index: number, principal: SubAdmin) {
        if(index >= 0 && index < this.admins.length)
            this.admins[index].setFields(principal);
        else
        {
            console.log("Invalid index for editing principal");
            console.log(index);
        }
        console.log("indddd: ", index);
    }
}
