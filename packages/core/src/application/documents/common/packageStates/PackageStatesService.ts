import {} from '../flows/FlowsService';
import { IState, IAggregatedState, PackageType } from './types';
import inStates from './IN/states/inStates';
import outStates from './OUT/states/outStates';
import draftStates from './DRAFT/states/draftStates';
import INProcessing from './IN/aggregatedStates/Processing';
import OUTProcessing from './OUT/aggregatedStates/Processing';

class PackageStatesService {
  private statesList: { [key: string]: IState[] };
  private aggregatedNamesMap: { [key: string]: Map<string, any> };
  private stateNamesMap: { [key: string]: Map<string, any> };

  private getAggregatedNamesMap = (type: PackageType) => {
    const aggregatedMap = new Map();
    this.statesList[type].forEach(state => {
      if (!state.aggregatedState) return; //check

      if (aggregatedMap.has(state.aggregatedState)) {
        const statesToSet = [...aggregatedMap.get(state.aggregatedState), state];
        aggregatedMap.set(state.aggregatedState.name, statesToSet);
      } else {
        aggregatedMap.set(state.aggregatedState.name, [state]);
      }
    });
    aggregatedMap.set(INProcessing.name, this.statesList[type]);
    return aggregatedMap;
  };

  private getStateNamesMap = (type: PackageType) => {
    const stateNamesMap = new Map();
    this.statesList[type].forEach(state => {
      stateNamesMap.set(state.name, state);
    });
    return stateNamesMap;
  };

  constructor() {
    this.statesList = {
      IN: [...inStates],
      OUT: [...outStates, ...draftStates]
    };
    this.aggregatedNamesMap = {
      IN: this.getAggregatedNamesMap('IN'),
      OUT: this.getAggregatedNamesMap('OUT')
    };
    this.stateNamesMap = {
      IN: this.getStateNamesMap('IN'),
      OUT: this.getStateNamesMap('OUT')
    };
  }

  isDraftState = (stateName: string) => {
    return draftStates.some(state => state.name === stateName);
  };

  getStatesByAggregatedName = (aggregatedName: string, type: PackageType): IState[] => {
    if (this.aggregatedNamesMap[type].has(aggregatedName))
      return this.aggregatedNamesMap[type].get(aggregatedName);

    return this.statesList[type];
  };

  getStateByName = (stateName: string, type: PackageType): IState => {
    const state = this.stateNamesMap[type].get(stateName);
    if (state) return state;

    switch (type) {
      case 'IN':
        return INProcessing;
      case 'OUT':
        return OUTProcessing;
    }
  };

  getAggregatedStateByStateName = (stateName: string, type: PackageType): IAggregatedState => {
    const state = this.getStateByName(stateName, type);
    if (state?.aggregatedState) return state.aggregatedState;
    if (state) return state;

    switch (type) {
      case 'IN':
        return INProcessing;
      case 'OUT':
        return OUTProcessing;
    }
  };
}

const instance = new PackageStatesService();
export default instance;
