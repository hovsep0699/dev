export interface IModel<T, P> {
    compare: (other: T) => boolean;
    toFlatJson: () => Record<string, T>;
    copyWith: (other: P) => T;
}

export interface IModelBase<T, P> {
    compare: (other: T) => boolean;
    copyWith: (other: P) => T;
}