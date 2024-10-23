export interface IFlow {
  name: string;
  label: string;
  type: 'local' | 'connector' | 'roaming' | 'internal_roaming' | 'taxcomhub';
  aggregatedFlow?: IAggregatedFlow;
}

export interface IAggregatedFlow {
  name: string;
  label: string;
  shortLabel?: string;
}
