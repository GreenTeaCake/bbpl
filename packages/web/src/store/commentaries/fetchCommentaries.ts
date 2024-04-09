import type { Commentary } from '@bbpl/common';
import { getFromApi } from 'client';
import { populateTags } from './populateTags';
import { createAppThunk } from '../createAppThunk';

export const fetchCommentaries = createAppThunk<Commentary[], number>(
  'commentaries/fetch',
  async (postId, thunkApi) => {
    const queryKey = ['posts', postId, 'comments'];
    const commentaries = await getFromApi<Commentary[]>(queryKey)(thunkApi.signal);
    return commentaries.map(populateTags).map((c) => ({ ...c, replies: [] }));
  },
);
