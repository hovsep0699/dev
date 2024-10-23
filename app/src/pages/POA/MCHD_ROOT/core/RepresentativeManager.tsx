import {Representative} from "../domain/model/Representative";
import autobind from "autobind-decorator";

export  class RepresentativeManager {
    private representatives: Representative[];
    constructor(representatives?: Representative[] | null) {
        this.representatives = representatives ?? new Array<Representative>();
        if (representatives && representatives.length > 0) {
            this.representatives[0].setFields(representatives[0]);
        }
    }

    @autobind
    public addRepresentative(fields: any) {
        const representative: Representative = new Representative();
        representative.setFields(fields);
        this.representatives.push(representative);
    }

    @autobind
    public removeRepresentative(index: number) {
        this.representatives.splice(index, 1);
    }

    @autobind
    public getRepresentatives(): Representative[] {
        return this.representatives;
    }

    @autobind
    public editRepresentative(index: number, representative: Representative) {
        if(index >= 0 && index < this.representatives.length)
            this.representatives[index].setFields(representative);
        else
        {
            throw new Error(`Invalid index for editing representative ${index}`)
        }
    }
}
