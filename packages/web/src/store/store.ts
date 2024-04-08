import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { type PostsState, postsSlice } from './posts';

export type AppState = {
  posts: PostsState;
};

export const store = configureStore<AppState>({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
