import React from "react";
import {Presenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/presenter/presenter";
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import autobind from "autobind-decorator";
import {deepEqual} from "@distate/app/src/pages/POA/MCHD_ROOT/utils/json_hepler";
import {state} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/presenter/BasicState";

export interface TestPresenterViewModel {
    x?: number | null;
}


export class TestState implements state<TestState, TestPresenterViewModel> {
    public x: number;
    constructor(x?: number | null) {
        this.x = x ?? 0;
    }

    @autobind
    initial(): TestState {
        return new TestState(
            0
        )
    }
    @autobind
    copyWith({x}: TestPresenterViewModel) {
        return new TestState(x ?? this.x);
    }

    @autobind
    compare(state: object) {
        return deepEqual(state, this.x);
    }
}


const Texting: React.FC = () => {
    const presenter = new Presenter<{x: number}, any>({x: 8})
    return (
        <ObservableComponent<TestPresenterViewModel, TestState, Presenter<{x: number}, any>>
            builder={(state: any) => (
            <>
                <h2> {state.x}</h2>
                <button onClick={() => presenter.setState({x: 6})}>Back</button>
            </>
        )} create={() => presenter}/>
    )
}

export default Texting;
