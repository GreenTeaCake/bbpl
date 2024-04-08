import { useState, type FC } from 'react';
import { getFilteredPostData, useAppSelector } from 'store';
import Stack from '@mui/material/Stack';
import { PostListItem } from './PostListItem';

export const PostList: FC = () => {
  const postData = useAppSelector(getFilteredPostData);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Stack spacing={2}>
      {postData.map((postDataEntry) => {
        const { post, user } = postDataEntry;
        const { id } = post;
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
