import {applyMiddleware, createStore} from 'redux';
import reducer from '../reducers/index.jsx';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import thunkMiddleware from 'redux-thunk';

const persistConfig = {
    key:'root-phmt',
    storage,
};



const persistedReducer = persistReducer(persistConfig, reducer);

// export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware)
);
/*store.subscribe( () => {
    console.log('state heyyyyy\n', store.getState());
});*/

export const persistor = persistStore(store);
