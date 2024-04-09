import type { FC } from 'react';
import Grid from '@mui/material/Grid';
import { PostFilter } from 'pages/components/PostFilter';
import { PostList } from 'pages/components/PostList';

export const PostsPageMobile: FC = () => {
  return (
    <Grid alignItems="stretch" container direction="column" spacing={2}>
      <Grid item>
        <PostFilter />
      </Grid>
      <Grid item>
        <PostList />
      </Grid>
    </Grid>
  );
};
