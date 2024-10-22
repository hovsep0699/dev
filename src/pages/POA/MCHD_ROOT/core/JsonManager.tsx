import autobind from "autobind-decorator";
import {CreatePresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenter";
import {SectionPresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterState";
import {CreatePresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenterState";
import {IJsonManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/IJsonManager";
import {Principal} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Principal";
import {Representative} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Representative";
import {cleanObject} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/json_hepler";


export class JsonCreateManager extends IJsonManager<CreatePresenter> {

    @autobind
    toFlatJson(): Record<string, any> {
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