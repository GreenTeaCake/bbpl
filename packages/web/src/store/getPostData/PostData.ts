import type { Post, User } from '@bbpl/common';

export type PostData = {
  post: Post;
  user?: User | undefined;
};
