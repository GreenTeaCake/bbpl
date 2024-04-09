/* eslint-disable no-param-reassign */
import type { Commentary, Tag } from '@bbpl/common';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import partition from 'lodash/fp/partition';
import { fetchCommentaries } from './fetchCommentaries';
import type { AsyncSliceState } from '../AsyncSliceState';

export type CommentariesState = AsyncSliceState<Commentary>;

const initialState: CommentariesState = {
  value: [],
  isLoading: false,
  error: null,
};

type UpdateTags = {
  commentaryId: number;
  tags: Tag[];
};

export const commentariesSlice = createSlice({
  name: 'commentaries',
  initialState,
  reducers: {
    updateTags: (state, action: PayloadAction<UpdateTags>) => {
      const { commentaryId, tags } = action.payload;
      const [[target], rest] = partition<Commentary>((c) => c.id === commentaryId)(state.value);
      if (target) {
        state.value = [...rest, { ...target, tags }];
      }
    },
  },
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

export const { updateTags } = commentariesSlice.actions;
