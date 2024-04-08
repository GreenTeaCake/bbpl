import { useState, type FC } from 'react';
import { getUsersMap, useAppSelector } from 'store';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { PostListItem } from './PostListItem';

export const PostList: FC = () => {
  const posts = useAppSelector((state) => state.posts.value);
  const usersMap = useSelector(getUsersMap);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Stack spacing={2}>
      {posts.map((post) => {
        const { id, userId } = post;
        const user = usersMap.get(userId);
        return (
          <PostListItem
            isSelected={id === selectedId}
            key={id}
            onClick={setSelectedId}
            post={post}
            user={user}
          />
        );
      })}
    </Stack>
  );
};
