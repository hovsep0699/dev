import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import autobind from "autobind-decorator";


export  class PrincipalManager {
    private principals: Principal[];
    constructor(principals: Principal[] = new Array<Principal>()) {
        this.principals = [new Principal()];

        if (principals && principals.length > 0) {
            this.principals[0].setFields(principals[0]);
        }
    }

    @autobind
    public addPrincipal(fields: any) {
        const principal: Principal = new Principal();
        principal.setFields(fields);
        this.principals.push(principal);
    }

    @autobind
    public removePrincipal(index: number) {
        this.principals.splice(index, 1);
    }

    @autobind
    public getPrincipals(): Principal[] {
        return this.principals;
    }

    @autobind
    public editPrincipal(index: number, principal: Principal) {
        if(index >= 0 && index < this.principals.length)
            this.principals[index].setFields(principal);
        else
        {
            throw new Error(`Invalid index for editing principal ${index}`);
        }
    }

    @autobind
    public addAdminToPrincipal(index: number, admin: any) {
            this.principals[index].addAdmin(admin);
    }
}
