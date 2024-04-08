import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, AppState } from './store';

export type AppThunkConfig = {
  state: AppState;
  dispatch: AppDispatch;
};

export const createAppThunk = createAsyncThunk.withTypes<AppThunkConfig>();
