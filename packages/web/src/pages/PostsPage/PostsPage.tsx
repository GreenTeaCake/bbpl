import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { PostFilter } from 'pages/components/PostFilter';
import { PostList } from 'pages/components/PostList';

export const PostsPage: FC = () => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item container direction="column" spacing={2} md={5}>
        <Grid item>
          <PostFilter />
        </Grid>
        <Grid item>
          <PostList />
        </Grid>
      </Grid>
      <Grid item container direction="column" spacing={2} md={7}>
        <Grid item>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};
