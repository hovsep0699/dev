import {object} from "yup";
import autobind from "autobind-decorator";
import {deepEqual} from "../../utils/json_hepler";

export abstract class state<T, P> {
    abstract copyWith: (props: P) => T;
    abstract compare: (props: T) => boolean;
    abstract initial(): T
}

export interface ObjectPresenterViewModel {
    state?: object | null;
}


export class ObjectState implements state<object, ObjectPresenterViewModel> {
    public state: object;
    constructor(state?: object | null) {
        this.state = state ?? new object();
    }

    @autobind
    initial() {
        return new ObjectState(new object());
    }

    @autobind
    copyWith({state}: ObjectPresenterViewModel) {
        return new ObjectState(state ?? this.state);
    }

    @autobind
    compare(state: object) {
        return deepEqual(state, this.state);
    }
}

