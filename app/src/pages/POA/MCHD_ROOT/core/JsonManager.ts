import autobind from "autobind-decorator";
import {CreatePresenter} from "../presentation/pages/CreatePoa/presenter/createPresenter";
import {SectionPresenterState} from "../presentation/pages/Sections/presenter/SectionPresenterState";
import {CreatePresenterState} from "../presentation/pages/CreatePoa/presenter/createPresenterState";
import {IJsonManager} from "./IJsonManager";
import {Principal} from "../domain/model/Principal";
import {Representative} from "../domain/model/Representative";
import {cleanObject} from "../utils/json_hepler";


export class JsonCreateManager extends IJsonManager<CreatePresenter> {

    @autobind
    public toFlatJson(): Record<string, any> {
        const sectionState: SectionPresenterState = this.sectionPresenter.getState();
        const presenterState: CreatePresenterState = this.presenter.getState();
        const object: Record<string, any> = {
            predecessors: [],
            assignees: []
        };

        presenterState.principals.map((element: Principal) => {
            const entity: Record<string, any> = element.toFlatJson();
            object.predecessors.push(entity);
            return object;
        })
        presenterState.representatives.map((element: Representative) => {
            const entity: Record<string, any> = element.toFlatJson();
            object.assignees.push(entity);
            return object;
        })
        return cleanObject({
            force: false,
            document: {
                type: this.sectionPresenter.getState().selectedAttorneyType.value,
                poa: {
                    info: sectionState.info.toFlatJson(),
                    powers: sectionState.powers.toFlatJson(),
                    ...object
                }
            }
        }) ?? {};
    }
}