import type { Commentary } from '@bbpl/common';
import { getFromApi } from 'client';
import { createAppThunk } from '../createAppThunk';

export const fetchCommentaries = createAppThunk<Commentary[], number>(
  'commentaries/fetch',
  async (postId, thunkApi) => {
    return getFromApi<Commentary[]>(['posts', postId, 'comments'])(thunkApi.signal);
  },
);
