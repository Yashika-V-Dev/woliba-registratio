import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import registrationReducer from './slices/registrationSlice'
import interestsReducer from './slices/interestsSlice'
import authReducer from './slices/authSlice'

const persistConfig = {
  key: 'woliba-root',
  storage,
  whitelist: ['registration', 'auth'],
}

const rootReducer = combineReducers({
  registration: registrationReducer,
  interests: interestsReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
