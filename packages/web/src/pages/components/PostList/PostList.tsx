import type { FC } from 'react';
import { useAppSelector } from 'store';
import Stack from '@mui/material/Stack';
import { getPostData } from 'store/selectors/getPostData';
import { useParams } from 'react-router-dom';
import { PostListItemMemoized } from './PostListItem';

export const PostList: FC = () => {
  const postData = useAppSelector(getPostData);

  const { id: selectedPostId } = useParams();

  return (
    <Stack spacing={2}>
      {postData.map((postDataEntry) => {
        const { post, user } = postDataEntry;
        const { id } = post;
        return (
          <PostListItemMemoized
            isSelected={`${id}` === selectedPostId}
            key={id}
            post={post}
            user={user}
          />
        );
      })}
    </Stack>
  );
};
