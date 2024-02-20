import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import {persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
     REGISTER
} from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"

const persistConfig={
    key: "root",
    version: 1,
    storage:AsyncStorage
    };

    const rootReducer = userReducer
    const persisitedReducer = persistReducer(persistConfig, rootReducer)

    export const store = configureStore({
        reducer:persisitedReducer,
        middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
    })
    
    export let persistor = persistStore(store)