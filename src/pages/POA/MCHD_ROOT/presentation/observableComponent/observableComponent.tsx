import React from "react";
import {Presenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/presenter/presenter";
import {state} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/presenter/BasicState";
import {SectionPresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterState";

interface ObservableComponentProps<K, T extends state<T, K>, P extends Presenter<K, T>> {
    builder: (state: T, child?: React.ReactNode) => React.ReactNode;
    buildWhen?: null | ((oldState: T, newState: T) => boolean);
    create: () => P;
    children?: React.ReactNode;
}

function isState<T>(state: any): state is T {
    return state && typeof state.compare === 'function';
}

class ObservableComponent<K, T extends state<T, K>, P extends Presenter<K, T>> extends React.Component<ObservableComponentProps<K, T, P>, T> {
    protected presenter: P;

    constructor(props: ObservableComponentProps<K, T, P>) {
        super(props);

        // Initialize state


        // Initialize the presenter
        this.presenter = props.create();
        const state = (this.presenter as P).getState() as T
        if (isState<T>(state)) {
            this.state = state;
        }
        else {
            throw new Error(`Unknown state: ${JSON.stringify(state)}`);
            // this.state = new T();
        }

        // Subscribe to presenter state changes

        this.presenter.addObserver({update: this.handleStateChange});
    }

    componentWillUnmount() {
        // Clean up the listener when the component unmounts
        this.presenter.removeObserver(this.handleStateChange);
    }

    // by default rerender when presenter state changes
    private defaultBuildWhen = (oldState: T, newState: T) => {
        console.log("-----------------------::: ", oldState instanceof SectionPresenterState, newState instanceof SectionPresenterState);
        return !oldState.compare(newState);
    }
    // Handle state changes from the presenter
    private handleStateChange = () => {
        const oldState = this.state as T;
        const newState = this.presenter.getState() as T;

        if (isState<T>(oldState) && isState<T>(newState)) {
            if (this.props.buildWhen) {
                if (this.props.buildWhen(oldState as T, newState))
                    this.setState(newState);
            }
            else if (this.defaultBuildWhen(oldState, newState))
                this.setState(newState);
        }
        else {
            this.setState(newState);
        }

    };

    render() {
        const { builder, children } = this.props;
        const { presenter } = this;

        // Use the builder function to render the component
        return builder(presenter.getState() as T, children ?? <></>);
    }
}





export default ObservableComponent;