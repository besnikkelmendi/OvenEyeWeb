import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "features/cameraSlice.js";
import userReducer from "features/userSlice.js";
import {applyMiddleware, createStore, combineReducers } from 'redux';
import reducer from './features/index.js'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import thunkMiddleware from 'redux-thunk';
const persistConfig = {
	key: 'root-oe',
	storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	camera: cameraReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer, window.devToolsExtension && window.devToolsExtension());
let persister = persistStore(store);

export { store, persister };

// export const store =  configureStore({
//     reducer: {
//         // persistedReducer
//         camera: cameraReducer,
//         user: userReducer,
//     },
//     preloadedState: persistedState,
// });

//store.subscribe(()=> saveToLocalStorage(store.getState()));