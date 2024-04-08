/* eslint-disable no-param-reassign */
import type { Post } from '@bbpl/common';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './fetchPosts';
import type { AsyncSliceState } from '../AsyncSliceState';

export type PostsState = AsyncSliceState<Post>;

const initialState: PostsState = {
  value: [],
  isLoading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.value = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});
