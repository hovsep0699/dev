import autobind from "autobind-decorator";
import {state} from "./BasicState";

export interface ComponentObserver<P, T extends state<T, P>> {
    update: (state: T) => void;
}

export interface IPresenter<T> {
    setState: (state: T) => void;
    getState: () => T;
}


export class Presenter<P, T extends state<T, P>> implements IPresenter<T> {
    // private static PresenterF>;
    protected observers: ComponentObserver<P, T>[] = [];
    protected state: T;

    constructor(initialState: T) {
        this.state = initialState;

    }

    // Add an observer
    @autobind
    addObserver(observer: ComponentObserver<P, T>): void {
        this.observers.push(observer);
    }

    // Remove an observer
    @autobind
    removeObserver(observer: (state: T) => void): void {
        this.observers = this.observers.filter(obs => obs.update !== observer);
    }

    // Notify all observers of state changes
    protected notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this.state));
    }

    // Get the current state
    @autobind
    getState(): T {
        return this.state as T;
    }

    // Set a new state and notify observers
    @autobind
    setState(newState: T): void {
        console.log("old: ", this.state, newState);
        this.state = newState;
        this.notifyObservers();
    }
}

