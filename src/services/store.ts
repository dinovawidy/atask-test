import { configureStore } from "@reduxjs/toolkit";
import GithubReducer from "../pages/redux/Reducer"


const store = configureStore({
    reducer: {
        github: GithubReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;