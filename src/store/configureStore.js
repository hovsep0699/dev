import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

import { createRootReducer } from './rootReducer';
import * as signSagas from '../container/sign/store/sagas';
import * as filterSagas from '../container/filter/store/sagas';
import * as folderSagas from '../container/folder/store/sagas';
import * as companySagas from '../pages/company/store/sagas';
import * as systemSagas from '../pages/system/store/sagas';
import * as documentSagas from '../pages/documents/store/sagas';
import * as contractorSagas from '../pages/contractors/store/sagas';
import * as financeSagas from '../pages/finance/store/sagas';
import * as createDocument from '../pages/create-document/store/sagas';
import * as cabinetSagas from '../pages/cabinet/store/sagas';
import * as tariffSagas from '../pages/tariff/store/sagas';


const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all(
    [
      ...Object.values(signSagas),
      ...Object.values(filterSagas),
      ...Object.values(folderSagas),
      ...Object.values(companySagas),
      ...Object.values(documentSagas),
      ...Object.values(systemSagas),
      ...Object.values(contractorSagas),
      ...Object.values(financeSagas),
      ...Object.values(createDocument),
      ...Object.values(cabinetSagas),
      ...Object.values(tariffSagas)      
    ].map(fork)
  );
}

export default function configureStore(initialState, history) {
  const middleware = [routerMiddleware(history), sagaMiddleware];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
