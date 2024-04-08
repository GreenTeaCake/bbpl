import type { User } from '@bbpl/common';
import { getFromApi } from 'client';
import { createAppThunk } from '../createAppThunk';

export const fetchUsers = createAppThunk<User[]>('users/fetch', async (_, thunkApi) => {
  return getFromApi<User[]>(['users'])(thunkApi.signal);
});
