import { createStore , applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import StateReducer from '../reducers';

const persistConfig = {
 key: 'root',
 timeout: 0,
 storage: storage,
 stateReconciler: autoMergeLevel2 
};
const pReducer = persistReducer(persistConfig, StateReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);