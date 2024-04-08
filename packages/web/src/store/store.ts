import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {},
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkConfig = {
  state: AppState;
  dispatch: AppDispatch;
};

export const useAppDispatch: () => AppDispatch = useDispatch;

export const createAppThunk = createAsyncThunk.withTypes<AppThunkConfig>();
