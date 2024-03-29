import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tuple, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { ThunkDispatch, thunk } from "redux-thunk";
import rootReducer from "./rootReducer";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


// export const store = configureStore({
// reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)

// });

export const store = configureStore({
  reducer: persistedReducer, middleware: () => new Tuple(thunk),

});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
