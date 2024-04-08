import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { type PostsState, postsSlice } from './posts';
import { type UsersState, usersSlice } from './users';
import { type FiltersState, filtersSlice } from './filters';

export type AppState = {
  posts: PostsState;
  users: UsersState;
  filters: FiltersState;
};

export const store = configureStore<AppState>({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
    filters: filtersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
