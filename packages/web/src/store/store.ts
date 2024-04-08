import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { type PostsState, postsSlice } from './posts';
import { type UsersState, usersSlice } from './users';

export type AppState = {
  posts: PostsState;
  users: UsersState;
};

export const store = configureStore<AppState>({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
