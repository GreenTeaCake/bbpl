import type { Post } from '@bbpl/common';
import { getFromApi } from 'client';
import { createAppThunk } from '../createAppThunk';

export const fetchPosts = createAppThunk<Post[]>('posts/fetch', async (_, thunkApi) => {
  return getFromApi<Post[]>(['posts'])(thunkApi.signal);
});
