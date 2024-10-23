export interface IState {
  name: string;
  label: string;
  type: PackageType;
  aggregatedState?: IAggregatedState;
}

export interface IAggregatedState {
  name: string;
  label: string;
  type: PackageType;
}

export type PackageType = 'IN' | 'OUT';
