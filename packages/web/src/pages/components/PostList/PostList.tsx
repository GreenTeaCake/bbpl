import type { FC } from 'react';
import { useAppSelector } from 'store';
import { PostListItem } from './PostListItem';

export const PostList: FC = () => {
  const posts = useAppSelector((state) => state.posts.value);

  return (
    <>
      {posts.map((post) => {
        return <PostListItem key={post.id} post={post} />;
      })}
    </>
  );
};
