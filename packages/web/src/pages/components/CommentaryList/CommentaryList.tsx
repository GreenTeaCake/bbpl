import type { FC } from 'react';
import Stack from '@mui/material/Stack';
import { useAppSelector } from 'store';
import { getPostCommentaries } from 'store/selectors';
import { CommentaryListItemMemoized } from './CommentaryListItem';

type CommentaryListProps = {
  postId: number;
};

export const CommentaryList: FC<CommentaryListProps> = (props) => {
  const { postId } = props;

  const commentaries = useAppSelector((state) => getPostCommentaries(state, postId));

  return (
    <Stack alignItems="stretch" spacing={2}>
      {commentaries.map((commentary) => {
        const { id } = commentary;
        return <CommentaryListItemMemoized commentary={commentary} key={id} />;
      })}
    </Stack>
  );
};
