import { IFlow } from './types';
import localFlows from './local/localFlows';
import { IAggregatedFlow } from './types';
import connectorFlows from './connector/connectorFlows';
import roamingFlows from './roaming/roamingFlows';
import internalRoamingFlows from './internalRoaming/internalRoamingFlows';
import taxcomhubFlows from './taxcomhub/taxcomhubFlows';

class FlowsService {
  private flowsList: IFlow[];
  private aggregatedNamesMap: Map<string, any>;
  private flowNamesMap: Map<string, IFlow>;

  private getAggregatedNamesMap = () => {
    const aggregatedMap = new Map();
    this.flowsList.forEach(flow => {
      if (!flow.aggregatedFlow) return; //check

      if (aggregatedMap.has(flow.aggregatedFlow)) {
        const flowsToSet = [...aggregatedMap.get(flow.aggregatedFlow), flow];
        aggregatedMap.set(flow.aggregatedFlow.name, flowsToSet);
      } else {
        aggregatedMap.set(flow.aggregatedFlow.name, [flow]);
      }
    });
    return aggregatedMap;
  };
  private getFlowNamesMap = () => {
    const flowNamesMap = new Map();
    this.flowsList.forEach(flow => {
      flowNamesMap.set(flow.name, flow);
    });
    return flowNamesMap;
  };
  constructor() {
    this.flowsList = [
      ...localFlows,
      ...connectorFlows,
      ...roamingFlows,
      ...internalRoamingFlows,
      ...taxcomhubFlows
    ];
    this.aggregatedNamesMap = this.getAggregatedNamesMap();
    this.flowNamesMap = this.getFlowNamesMap();
  }

  getFlowsByAggregatedName = (aggregatedName: string): IFlow[] | null => {
    if (this.aggregatedNamesMap.has(aggregatedName))
      return this.aggregatedNamesMap.get(aggregatedName);

    const flow = this.getFlowByName(aggregatedName);
    return flow ? [flow] : null;
  };

  getFlowByName = (flowName: string): IFlow | null => {
    return this.flowNamesMap.get(flowName) || null;
  };

  getAggregatedFlowByFlowName = (flowName: string): IAggregatedFlow | null => {
    const flow = this.getFlowByName(flowName);
    if (flow?.aggregatedFlow) return flow.aggregatedFlow;

    return null;
  };
}

const instance = new FlowsService();
export default instance;
