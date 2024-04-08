import type { Post } from '@bbpl/common';
import type { FC } from 'react';

export type PostListItemProps = {
  post: Post;
};

export const PostListItem: FC<PostListItemProps> = (props) => {
  const {
    post: { title },
  } = props;
  return <div>{title}</div>;
};
