/* eslint-disable no-param-reassign */
import type { User } from '@bbpl/common';
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './fetchUsers';
import type { AsyncSliceState } from '../AsyncSliceState';

export type UsersState = AsyncSliceState<User>;

const initialState: UsersState = {
  value: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});
