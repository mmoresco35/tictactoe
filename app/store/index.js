import { createStore , applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import StateReducer from '../reducers';


// dado que es una aplicacion movil y se puede perder el foco e incluso matar la 
// aplicacion por parte del sistema (recepcion de llamadas, bateria agotada, etc) 
//incluimos persist para dar persistencia al estado de la aplicacion 
//y poder continuar partida aun tras el cierre completo de la aplicacion en esos casos

// configuracion de persist
const persistConfig = {
 key: 'root',
 timeout: 0,
 storage: storage,
 stateReconciler: autoMergeLevel2 
};
// defincion de persistor y store para su aplicacion en el root de la aplicacion.
const pReducer = persistReducer(persistConfig, StateReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);