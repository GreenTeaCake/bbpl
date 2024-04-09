import { createSelector } from '@reduxjs/toolkit';
import type { Tag } from '@bbpl/common';
import type { AppState } from '../store';

export const getAllTags = createSelector(
  [(state: AppState) => state.commentaries.value],
  (commentaries) =>
    new Set<Tag>(
      commentaries.flatMap((commentary) => {
        return commentary.tags ?? [];
      }),
    ),
);
