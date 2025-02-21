import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './githubSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    github: githubReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;