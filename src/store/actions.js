import { createAction } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { PARAMETER_REQUEST, PARAMETER_SUCCESS, PARAMETER_FAILURE } from './constants';

export const actionChangeRoute = createAction(LOCATION_CHANGE);

export const actionParameterRequest = createAction(PARAMETER_REQUEST);
export const actionParameterSuccess = createAction(PARAMETER_SUCCESS);
export const actionParameterFailure = createAction(PARAMETER_FAILURE);
