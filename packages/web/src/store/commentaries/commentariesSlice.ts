/* eslint-disable no-param-reassign */
import type { Commentary } from '@bbpl/common';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCommentaries } from './fetchCommentaries';
import type { AsyncSliceState } from '../AsyncSliceState';

export type CommentariesState = AsyncSliceState<Commentary>;

const initialState: CommentariesState = {
  value: [],
  isLoading: false,
  error: null,
};

export const commentariesSlice = createSlice({
  name: 'commentaries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentaries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const map = state.value.reduce((m, c) => m.set(c.id, c), new Map<number, Commentary>());
        action.payload.forEach((c) => map.set(c.id, c));

        state.value = [...map.values()];
      })
      .addCase(fetchCommentaries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});
