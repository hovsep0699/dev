import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as sign } from '../container/sign/store/reducer';
import { reducer as system } from '../pages/system/store/reducer';
import { reducer as company } from '../pages/company/store/reducer';
import { reducer as filter } from '../container/filter/store/reducer';
import { reducer as folders } from '../container/folder/store/reducer';
import { reducer as documents } from '../pages/documents/store/reducer';
import { reducer as contractors } from '../pages/contractors/store/reducer';
import { reducer as finance } from '../pages/finance/store/reducer';
import { reducer as createDocument } from '../pages/create-document/store/reducer';
import { reducer as cabinet } from '../pages/cabinet/store/reducer';
import { reducer as tariff } from '../pages/tariff/store/reducer';


export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    sign,
    filter,
    system,
    folders,
    company,
    documents,
    contractors,
    finance,
    createDocument,
    cabinet,
    tariff
  });

export default createRootReducer;
