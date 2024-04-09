import { createSelector } from '@reduxjs/toolkit';
import type { AppState } from '../store';

export const getPostCommentaries = createSelector(
  [(state: AppState) => state.commentaries.value, (_, postId: number) => postId],
  (commentaries, postId) => {
    return commentaries
      .filter((commentary) => commentary.postId === postId)
      .sort((a, b) => a.id - b.id);
  },
);
