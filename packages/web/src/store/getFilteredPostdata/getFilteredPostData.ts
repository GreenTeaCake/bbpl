import { createSelector } from '@reduxjs/toolkit';
import type { Post, User } from '@bbpl/common';
import { getUsersMap } from 'store/users';
import type { AppState } from '../store';
import { FACTORIES } from './predicates';

export type PostData = {
  post: Post;
  user?: User | undefined;
};

export const getFilteredPostData = createSelector(
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
