import { createSelector } from '@reduxjs/toolkit';
import { getUsersMap } from 'store/users/getUsersMap';
import { FACTORIES } from './predicateFactory';
import type { AppState } from '../store';
import type { PostData } from './PostData';

export const getPostData = createSelector(
  [
    getUsersMap,
    (state: AppState) => state.posts.value,
    (state: AppState) => state.filters.filterBy,
    (state: AppState) => state.filters.query,
  ],
  (users, posts, filterBy, query) => {
    const predicates = FACTORIES[filterBy].map((factory) => factory(query));
    return posts
      .map<PostData>((post) => ({ post, user: users.get(post.userId) }))
      .filter((postData) => predicates.some((predicate) => predicate(postData)));
  },
);
